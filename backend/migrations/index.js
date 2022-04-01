// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const path = require("path");
require("dotenv").config({ path: "../.env" });
const { DBHOST, DBUSER, DBPASSWORD, DBPORT, DBNAME, NODE_ENV } = process.env;
const config = {
  data: {
    DBHOST,
    DBUSER,
    DBPASSWORD,
    DBPORT,
    DBNAME,
  },
  development: {
    client: "mysql",
    connection: {
      host: DBHOST,
      user: DBUSER,
      password: DBPASSWORD,
      port: DBPORT,
      database: DBNAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "table_migrations",
      directory: path.resolve("./db_migrations"),
    },
    useNullAsDefault: true,
    seeds: {
      directory: path.resolve("./db_seeds"),
    },
  },

  staging: {
    client: "mysql",
    connection: {
      host: DBHOST,
      user: DBUSER,
      password: DBPASSWORD,
      port: DBPORT,
      database: DBNAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "table_migrations",
      directory: path.resolve("./db_migrations"),
    },
    useNullAsDefault: true,
    seeds: {
      directory: path.resolve("./db_seeds"),
    },
  },

  production: {
    client: "mysql",
    connection: {
      host: DBHOST,
      user: DBUSER,
      password: DBPASSWORD,
      port: DBPORT,
      database: DBNAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "table_migrations",
      directory: path.resolve("./db_migrations"),
    },
    useNullAsDefault: true,
    seeds: {
      directory: path.resolve("./db_seeds"),
    },
  },
};
module.exports = config[NODE_ENV];
