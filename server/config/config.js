
require('dotenv').config();

module.exports = {
  development: {
    port: process.env.PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    stripe_key: process.env.stripe_key,
    dialect: 'mysql',
  },
  test: {
    port: process.env.PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    stripe_key: process.env.stripe_key,
    dialect: 'mysql',
  },
  production: {
    use_env_variable: 'JAWSDB_URL',
    port: process.env.PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    stripe_key: process.env.stripe_key,
    dialect: 'mysql',
  },
};