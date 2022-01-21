const db = require('../config/db')
const { DataTypes } = require('sequelize');

const Referral = db.define('referral', {
    referred_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    membership_tier: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
      },
    },
    collected: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },      
  }, {
    timestamps: true,
});

module.exports = Referral