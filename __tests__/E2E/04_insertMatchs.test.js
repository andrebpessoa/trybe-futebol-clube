const { URL } = require('../utils/urls');
const { initBrowser, termBrowser } = require('../config/puppeteer');
const { pageMatchSettings, header, pageMatchs } = require('../utils/dataTestIds');
const { logAdmin } = require('../utils/logInto');
const { clubs } = require('../expected_results/trybe_football_club');
const { select } = require('../utils/query');
const { dbReset, termSequelize, initSequelize } = require('../config/sequelize');
const { puppeteerDefs, containerPorts } = require('../config/constants');
const { normalize, getRequirement } = require('../utils/util');
const { insertInProgress, insertFinished } = require('../utils/inserts');
const { StatusCodes } = require('http-status-codes');
const axios = require('axios').default;

const twoGoals = '2';
const oneGoal = '1';
const lastInsert = (list) => list[list.length - 1];

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

describe(getRequirement(23), () => {
  it('Será validado que é possível salvar um jogo no banco de dados e ver o jogo na página de jogos', async () => {
    const dadosInsert = {
      homeClub: clubs[3].clubName,
      awayClub: clubs[8].clubName,
      homeGoals: twoGoals,
      awayGoals: oneGoal
    }

    const body = await insertInProgress(page, dadosInsert)
    const newBody = {...body, inProgress: Number(body.inProgress)}

    const rows = await database.query(select.all.matchs, { type: 'SELECT' });
    const [matchInserted] = normalize([lastInsert(rows)])

    expect(matchInserted).toStrictEqual(newBody);

    const showMatchsButton = await page.$(header.showMatchsButton);
    await showMatchsButton.click();
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const homeTeam = await page.$eval(pageMatchs.homeTeam(49), (el) => el.innerText);
    const awayTeam = await page.$eval(pageMatchs.awayTeam(49), (el) => el.innerText);

    expect(homeTeam).toBe(clubs[3].clubName);
    expect(awayTeam).toBe(clubs[8].clubName);
  });
});

describe(getRequirement(24), () => {
  it('Será validado que ao finalizar uma partida é alterado no banco de dados e na página', async () => {

    const dadosInsert = {
      homeClub: clubs[3].clubName,
      awayClub: clubs[8].clubName,
      homeGoals: twoGoals,
      awayGoals: oneGoal
    }

    await insertFinished(page, dadosInsert)

    const rows = await database.query(select.all.matchs, { type: 'SELECT' });
    const [matchInserted] = normalize([lastInsert(rows)])

    expect(matchInserted.homeTeam).toBe(clubs[3].id);
    expect(matchInserted.awayTeam).toBe(clubs[8].id);
    expect(matchInserted.inProgress).toBe(0);

    const showMatchsButton = await page.$(header.showMatchsButton);
    await showMatchsButton.click();
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const homeTeam = await page.$eval(pageMatchs.homeTeam(49), (el) => el.innerText);
    const awayTeam = await page.$eval(pageMatchs.awayTeam(49), (el) => el.innerText);
    const matchStatus = await page.$eval(pageMatchs.matchStatus(49), (el) => el.innerText);

    expect(homeTeam).toBe(clubs[3].clubName);
    expect(awayTeam).toBe(clubs[8].clubName);
    expect(matchStatus).toBe('Finalizado');
  });
});

describe(getRequirement(25), () => {
  it('Será validado que não é possivel inserir uma partida com times iguais', async () => {
    const dadosInsert = {
      homeClub: clubs[3].clubName,
      awayClub: clubs[3].clubName,
      homeGoals: twoGoals,
      awayGoals: oneGoal
    }
    const { message } = await insertInProgress(page, dadosInsert, StatusCodes.UNAUTHORIZED);
    const messageExpect = 'It is not possible to create a match with two equal teams';

    expect(messageExpect).toBe(message);
  });
});

describe(getRequirement(26), () => {
  it('Será validado na API que não é possível inserir uma partida com time que não existe na tabela clubs', async () => {
    const dadosInsert = {
      homeTeam: 12345,
      awayTeam: 3,
      homeGoals: twoGoals,
      awayGoals: oneGoal
    }

    const { data: { token } } = await axios.post(`${URL(containerPorts.backend).BASE_URL}/login`, {
      "email": "admin@admin.com",
      "password": "secret_admin"
    });

    expect(token).not.toBeNull();

    const result = await axios
      .post(
        `${URL(containerPorts.backend).BASE_URL}/matchs`,
        dadosInsert,
        {
          headers: {
            authorization: token
          }
        }
      )
      .then(({ status, data: { message } }) => ({status, message}))
      .catch(({response: { status, data: { message } }}) => ({status, message}));

    expect(result).toHaveProperty("status");
    expect(result).toHaveProperty("message");
    expect(result.status).toBe(401);
    expect(result.message).toBe("There is no team with such id!");
  });
});
