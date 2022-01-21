const db = require('../config/db')
const { DataTypes } = require('sequelize');

const Referral = db.define('referral', {
    membership_tier: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
      },
    },
  }, {
    timestamps: true,
});

module.exports = Referral