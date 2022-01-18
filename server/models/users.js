const db = require("../config/db");
const { DataTypes } = require('sequelize');


const bcrypt = require('bcrypt');



const User = db.define('user', {
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
  referred: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  referral_code: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: {
      isAlphanumeric: true,
    },
  },
  membership_tier: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isNumeric: true,
    },
  },
});


User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

User.addHook('beforeCreate', (user) => {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
});

module.exports = User;