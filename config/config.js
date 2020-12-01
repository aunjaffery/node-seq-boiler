module.exports = {
  development: {
    username: "root",
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    logging: false,
    timezone: "+05:00",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
    },
  },
  production: {
    username: "root",
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    logging: false,
    timezone: "+05:00",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
    },
  },
};
