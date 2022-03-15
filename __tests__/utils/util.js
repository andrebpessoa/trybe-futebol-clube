/* eslint-disable no-async-promise-executor */
/* eslint-disable no-promise-executor-return */
const { promisify } = require('util');
const camelCase = require('camelcase')

const { defaultDelay, prefix, numbers: { one }, defaultRounds } = require('../config/constants');
const { requirements } = require('../../.trybe/requirements.json');

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const exec = promisify(require('child_process').exec);

const condExec = async ({
  command = false,
  validate,
  include,
  rounds = defaultRounds,
  log = process.env.DEBUG === "true",
  customDelay = defaultDelay,
  message,
  exitDelay = false
}) => {
  let isValid = false;
  let current = 1;
  let report;

  if(command) {
    await exec(command).catch(() => true);
  }

  while(!isValid) {
    if(message){
      console.warn(message);
    }

    if(current >= rounds) {
      throw new Error(`Não foi possivel executar a função com os parametros: ${JSON.stringify(report)}`);
    }

    await delay(customDelay);

    const { stdout, stderr } = await exec(validate)
      .catch(({ stdout, stderr }) => ({ stdout, stderr }));

    isValid = !!stdout.includes(include) || !!stderr.includes(include);

    report = {
      date: new Date().toISOString(),
      isValid,
      current,
      rounds,
      command,
      validate,
      include,
      stdout,
      stderr
    };

    if(log) {
      console.warn(report);
    }

    current += one;
  }

  if(exitDelay !== false){
    await delay(Number(exitDelay));
  }

  return report;
}

const { EVAL_CONTAINER_NAME } = process.env;

const genContextName = (name = '', id = '') =>
  `${name}-${EVAL_CONTAINER_NAME || prefix + '-' + id}`;

const genId = require('uuid').v4;

const changeCamelCase = (data = {}) => {
  const entries = Object.entries(data)
  const newEntries = entries.map(([chave, valor]) => ([camelCase(chave), valor]))
  return Object.fromEntries(newEntries)
}

const changeNumberinString = (data = {}) => {
  const entries = Object.entries(data)
  const newEntries = entries.map(([chave, valor]) => ([chave, valor.toString()]))
  return Object.fromEntries(newEntries)
}

const normalizeString = (data) => data.map(changeNumberinString)
const normalize = (data) => data.map(changeCamelCase)

const getRequirement = (itemNumber = 1) => {
  const [requirement] = returnRequirement(itemNumber)
  return requirement.description
}
const returnRequirement = (itemNumber = 1) => requirements
.filter(el => el.description.startsWith(`${itemNumber} -`))

module.exports = {
  delay,
  exec,
  condExec,
  genContextName,
  genId,
  normalize,
  normalizeString,
  getRequirement
};
