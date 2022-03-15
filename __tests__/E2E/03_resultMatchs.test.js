const { URL } = require('../utils/urls');
const { initBrowser, termBrowser } = require('../config/puppeteer');
const { pageMatchs, header } = require('../utils/dataTestIds');
const { logAdmin, logUser } = require('../utils/logInto');
const { allMatchs, onlyInProgress, onlyFinished } = require('../entities/matchs');
const { validateMatchs } = require('../utils/validateMatchs');
const { dbReset, initSequelize, termSequelize } = require('../config/sequelize');
const { puppeteerDefs, containerPorts } = require('../config/constants');
const { getRequirement } = require('../utils/util');
const axios = require('axios').default;

const IN_PROGRESS = 'Em andamento';
const FINISH = 'Finalizado';
const ALL_MATCHS = 'Todos os Jogos';

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

describe(getRequirement(16), () => {
  it('O avaliador verificará se tentar fazer a requisição correta na sua API, os dados corretos são retornados', async () => {
    const expectedResult = [
      {
        "id": 1,
        "clubName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "clubName": "Bahia"
      },
      {
        "id": 3,
        "clubName": "Botafogo"
      },
      {
        "id": 4,
        "clubName": "Corinthians"
      },
      {
        "id": 5,
        "clubName": "Cruzeiro"
      },
      {
        "id": 6,
        "clubName": "Ferroviária"
      },
      {
        "id": 7,
        "clubName": "Flamengo"
      },
      {
        "id": 8,
        "clubName": "Grêmio"
      },
      {
        "id": 9,
        "clubName": "Internacional"
      },
      {
        "id": 10,
        "clubName": "Minas Brasília"
      },
      {
        "id": 11,
        "clubName": "Napoli-SC"
      },
      {
        "id": 12,
        "clubName": "Palmeiras"
      },
      {
        "id": 13,
        "clubName": "Real Brasília"
      },
      {
        "id": 14,
        "clubName": "Santos"
      },
      {
        "id": 15,
        "clubName": "São José-SP"
      },
      {
        "id": 16,
        "clubName": "São Paulo"
      }
    ];

    const result = await axios
      .get(
        `${URL(containerPorts.backend).BASE_URL}/clubs`,
      )
      .then(({ status, data }) => ({status, data}))
      .catch(({response: { status, data }}) => ({ status, data }));

    expect(result).toHaveProperty("status");
    expect(result).toHaveProperty("data");
    expect(result.status).toBe(200);
    expect(result.data).toMatchObject(expectedResult);
  });
});

describe(getRequirement(17), () => {
  it('O avaliador verificará se tentar fazer a requisição correta na sua API, os dados corretos são retornados', async () => {
    const expectedResult = {
      "id": 5,
      "clubName": "Cruzeiro"
    };

    const result = await axios
      .get(
        `${URL(containerPorts.backend).BASE_URL}/clubs/5`,
      )
      .then(({ status, data }) => ({status, data}))
      .catch(({response: { status, data }}) => ({ status, data }));

    expect(result).toHaveProperty("status");
    expect(result).toHaveProperty("data");
    expect(result.status).toBe(200);
    expect(result.data).toMatchObject(expectedResult);
  });
});

describe(getRequirement(19), () => {
  it('Será validado que a página apresentará todos os dados de partidas sem nenhum filtro', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const headerButtonShowMatchs = await page.$(header.showMatchsButton);
    await headerButtonShowMatchs.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await validateMatchs(page, ALL_MATCHS, allMatchs, false);
  });
});

describe(getRequirement(20), () => {
  it('Será validado que ao escolher a opção de partidas em andamento será filtrado todas as partidas em andamento', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const headerButtonShowMatchs = await page.$(header.showMatchsButton);
    await headerButtonShowMatchs.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await validateMatchs(page, IN_PROGRESS, onlyInProgress, false);
  });
});

describe(getRequirement(21), () => {
  it('Será validado que ao escolher a opção de partidas finalizadas será filtrado todas as partidas finalizadas', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const headerButtonShowMatchs = await page.$(header.showMatchsButton);
    await headerButtonShowMatchs.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await validateMatchs(page, FINISH, onlyFinished, false);
  });
});
