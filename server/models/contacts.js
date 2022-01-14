const db = require('../config/db')
const { DataTypes } = require('sequelize');

const Contacts = db.define('contacts', {
    name: {
      type: DataTypes.STRING,

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING(1000)
    }, 
  }, {
    timestamps: true,
});

module.exports = Contacts