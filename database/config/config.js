require("dotenv").config();

module.exports = {
  development: {
    username: process.env.USERDAME_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    database: process.env.DATABASE,
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
    host: "127.0.0.1",
    dialect: "postgres",
    use_env_variable: "TEST_DATABASE_URL",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
    host: "127.0.0.1",
    dialect: "postgres",
    use_env_variable: "DATABASE_URL",
  },
};
