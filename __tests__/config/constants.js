const { resolve } = require('path');

module.exports = {
  prefix: 'trybe-eval-tfc',
  challengesFolder: resolve('app'),
  containerPorts: {
    frontend: 3000,
    backend: 3001,
    database: 3002,
  },
  defaultDelay: 5000,
  defaultRounds: 30,
  puppeteerDefs: {
    headless: !(process.env.SHOW_BROWSER === "true"),
    slowMo: 5,
    baseUrl: "http://localhost",
    pause: {
      brief: 500,
      long: 5000
    }
  },
  sequelizeDefs: {
    username: 'root',
    password: '123456',
    database: 'TRYBE_FUTEBOL_CLUBE',
    host: 'localhost',
    port: 3002,
    dialect: 'mysql',
    dialectOptions: {
      timezone: 'Z',
    },
    logging: false,
  },
  numbers: {
    one: 1,
    three: 3
  },
};
