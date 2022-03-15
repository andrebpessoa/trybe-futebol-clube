const { Sequelize } = require('sequelize');
const { condExec } = require('../utils/util');

const { sequelizeDefs } = require('./constants');
const { docker, dockerFind } = require('../utils/commands')

async function dbReset() {
  return condExec({
    command: docker.exec("app_backend", 'npm run db:reset'),
    validate: docker.exec("app_backend", 'npx sequelize-cli db:migrate:status'),
    include: '-create-user.js',
  });
}

async function initSequelize() {
  await condExec({
    validate: docker.exec("app_backend", '[ -s ./build/database/config/database.js ] && echo true'),
    include: 'true',
  });

  await dbReset();

  const sequelize = new Sequelize(sequelizeDefs);

  const [validate] = await sequelize.query('SELECT 1+1 as result', { type: 'SELECT' });

  if(validate?.result !== 2){
    throw new Error('Não foi possível conectar ao banco de dados')
  }

  return sequelize;
}

async function termSequelize(sequelize) {
  return sequelize?.close();
}

module.exports = {
  initSequelize,
  termSequelize,
  dbReset,
};
