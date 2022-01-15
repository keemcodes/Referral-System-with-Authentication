require('dotenv').config();

module.exports = {
  development: {
    stripe_key: process.env.stripe_key,
  },
  test: {
    stripe_key: process.env.stripe_key,
  },
  production: {
    stripe_key: process.env.stripe_key,
  },
};