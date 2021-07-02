// require("dotenv").config();

const {
  DB_USERNAME_DEV,
  DB_PASSWORD_DEV,
  DB_NAME_DEV,
  DB_HOST_DEV,
  DB_DIALECT_DEV,
  DB_DIALECT_OPTIONS_DEV,
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME_DEV,
    password: DB_PASSWORD_DEV,
    database: DB_NAME_DEV,
    host: DB_HOST_DEV,
    dialect: DB_DIALECT_DEV,
    // dialectOptions: {
    //   ssl: { rejectUnauthorized: false },
    // },
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
