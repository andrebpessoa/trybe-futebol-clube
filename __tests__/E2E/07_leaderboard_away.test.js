const { initBrowser, termBrowser } = require('../config/puppeteer');
const { dbReset, initSequelize, termSequelize } = require('../config/sequelize');
const { validateLeaderboardBody } = require('../utils/validateLeaderboard');
const { awayResult1, awayResult2 } = require('../entities/leaderboard/awayResult');
const { leaderboard, header } = require('../utils/dataTestIds');
const { URL } = require('../utils/urls');
const { clubs } = require('../expected_results/trybe_football_club');
const { insertFinished } = require('../utils/inserts');
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

const endpoint = '/leaderboard/away'
const twoGoals = '2';
const oneGoal = '1';

describe(getRequirement(31), () => {
  it('Será avaliado que ao fazer a requisição ao endpoint /leaderboard/away será retonado os campos e valores corretos considerando os dados iniciais do banco de dados', async () => {
    await page.select(leaderboard.table.filter.select, 'Classificação Visitantes')
    const classificationButton = await page.$(leaderboard.table.filter.button)
    const actionTrigger = () => classificationButton.click()

    await validateLeaderboardBody(awayResult1, leaderboard, page, containerPorts.backend, endpoint, actionTrigger);
  });
});

describe(getRequirement(32), () => {
  it('Será avaliado que após acrescentar a partida Botafogo 2 X 1 Grêmio e fazer a requisição ao endpoint /leaderboard/away será retonado os campos e valores corretos', async () => {
    const dadosInsert = {
      homeClub: clubs[3].clubName,
      awayClub: clubs[8].clubName,
      homeGoals: twoGoals,
      awayGoals: oneGoal
    }
    await insertFinished(page, dadosInsert)
    const showMatchsButton = await page.$(header.showMatchsButton);
    await showMatchsButton.click();
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const showClassificationButton = await page.$(header.showClassificationButton)
    await showClassificationButton.click()
    await page.waitForTimeout(puppeteerDefs.pause.brief);


    await page.select(leaderboard.table.filter.select, 'Classificação Visitantes')
    const classificationButton = await page.$(leaderboard.table.filter.button)
    const actionTrigger = () => classificationButton.click()

    await validateLeaderboardBody(awayResult2, leaderboard, page, containerPorts.backend, endpoint, actionTrigger);
  });
});
