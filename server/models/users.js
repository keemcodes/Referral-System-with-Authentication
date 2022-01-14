const db = require("../config/db");
const { DataTypes } = require('sequelize');


const bcrypt = require('bcrypt');

  const User = db.define('User', {
    firstName: {
      type: DataTypes.STRING,
      unique: false,
    },
    lastName: {
      type: DataTypes.STRING,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.addHook('beforeCreate', (user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

module.exports = User;