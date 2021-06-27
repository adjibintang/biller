// require("dotenv").config();

// const {
//   DB_USERNAME_DEV,
//   DB_PASSWORD_DEV,
//   DB_NAME_DEV,
//   DB_HOST_DEV,
//   DB_DIALECT_DEV,
// } = process.env;

module.exports = {
  development: {
    username: "postgres",
    password: "1234",
    database: "biller",
    host: "localhost",
    dialect: "postgres",
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
