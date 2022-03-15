const { initBrowser, termBrowser } = require('../config/puppeteer');
const { dbReset, initSequelize, termSequelize } = require('../config/sequelize');
const { validateLeaderboardBody, validateLeaderboardHeader } = require('../utils/validateLeaderboard');
const { state01, state02, state03 } = require('../entities/leaderboard');
const { leaderboard, header } = require('../utils/dataTestIds');
const { URL } = require('../utils/urls');
const { insertFinished } = require('../utils/inserts');
const { clubs } = require('../expected_results/trybe_football_club');
const { puppeteerDefs, containerPorts } = require('../config/constants');
const { getRequirement } = require('../utils/util');

let database, browser, page;

beforeAll(async () => {
  database = await initSequelize();
});

afterAll(async () => termSequelize(database));

beforeEach(async () => {
  await dbReset();
  [browser, page] = await initBrowser();
  await page.goto(URL(containerPorts.frontend).BASE_URL);
});

afterEach(async () => {
  await termBrowser(browser);
});
const actionTriger = () => page.reload()
const endpoint = '/leaderboard'
const number = {
  three: '3',
  zero: '0',
  one: '1',
}

describe(getRequirement(33), () => {
  it('Será avaliado que ao fazer a requisição ao endpoint /leaderboard será retonado os campos e valores corretos considerando os dados iniciais do banco de dados', async () => {
    await validateLeaderboardBody(state01, leaderboard, page, containerPorts.backend, endpoint, actionTriger);
  });
});

describe(getRequirement(34), () => {
  it('Será avaliado que após acrescentar a partida Flamengo 3 X 0 Napoli-SC e fazer a requisição ao endpoint /leaderboard será retonado os campos e valores corretos', async () => {
    const dadosInsert = {
      homeClub: clubs[6].clubName,
      awayClub: clubs[10].clubName,
      homeGoals: number.three,
      awayGoals: number.zero
    }
    await insertFinished(page, dadosInsert)

    const showMatchsButton = await page.$(header.showMatchsButton);
    await showMatchsButton.click();
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const showClassificationButton = await page.$(header.showClassificationButton)
    await showClassificationButton.click()
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await validateLeaderboardBody(state02, leaderboard, page, containerPorts.backend, endpoint, actionTriger);
  });
});

describe(getRequirement(35), () => {
  it('Será avaliado que após acrescentar a partida Minas Brasília 1 X 0 Ferroviária e fazer a requisição ao endpoint /leaderboard será retonado os campos e valores corretos', async () => {
    const dadosInsert = {
      homeClub: clubs[9].clubName,
      awayClub: clubs[5].clubName,
      homeGoals: number.one,
      awayGoals: number.zero
    }
    await insertFinished(page, dadosInsert)

    const showMatchsButton = await page.$(header.showMatchsButton);
    await showMatchsButton.click();
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const showClassificationButton = await page.$(header.showClassificationButton)
    await showClassificationButton.click()
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await validateLeaderboardBody(state03, leaderboard, page, containerPorts.backend, endpoint, actionTriger);
  });
});
