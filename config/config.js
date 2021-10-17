const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'webT',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: 'admin',
    database: 'webT',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE_NAME,
    host: process.env.RDS_HOSTNAME,
    dialect: process.env.RDS_DIALECT,
    dialectOptions: {
        ssl: process.env.RDS_SSL
    }
  },
};