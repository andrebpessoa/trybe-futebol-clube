const { URL } = require('./urls');
const { normalizeString } = require('./util');
const waitForResponse = require('./waitForResponse');
const { leaderboard } = require('./dataTestIds')

const validateLeaderboardHeader = async (leaderboardTestsIds, page) => {
  const { table: { header } } = leaderboardTestsIds;

  await page.waitForSelector('[data-testid="score_boarding__classification"]');

  const scoreBoardTableHeaderMock = ['Classificação', 'Time', 'P', 'J', 'V', 'E', 'D', 'GP', 'GC', 'SG', '%'];

  const classification = await page.$eval(header.classification, (el) => el.innerText);
  const clubName = await page.$eval(header.clubName, (el) => el.innerText);
  const totalPoints = await page.$eval(header.totalPoints, (el) => el.innerText);
  const totalGames = await page.$eval(header.totalGames, (el) => el.innerText);
  const totalVictories = await page.$eval(header.totalVictories, (el) => el.innerText);
  const totalDraws = await page.$eval(header.totalDraws, (el) => el.innerText);
  const totalLosses = await page.$eval(header.totalLosses, (el) => el.innerText);
  const goalsFavor = await page.$eval(header.goalsFavor, (el) => el.innerText);
  const goalsOwn = await page.$eval(header.goalsOwn, (el) => el.innerText);
  const goalsBalance = await page.$eval(header.goalsBalance, (el) => el.innerText);
  const efficiency = await page.$eval(header.efficiency, (el) => el.innerText);

  expect(classification).toEqual(scoreBoardTableHeaderMock[0]);
  expect(clubName).toEqual(scoreBoardTableHeaderMock[1]);
  expect(totalPoints).toEqual(scoreBoardTableHeaderMock[2]);
  expect(totalGames).toEqual(scoreBoardTableHeaderMock[3]);
  expect(totalVictories).toEqual(scoreBoardTableHeaderMock[4]);
  expect(totalDraws).toEqual(scoreBoardTableHeaderMock[5]);
  expect(totalLosses).toEqual(scoreBoardTableHeaderMock[6]);
  expect(goalsFavor).toEqual(scoreBoardTableHeaderMock[7]);
  expect(goalsOwn).toEqual(scoreBoardTableHeaderMock[8]);
  expect(goalsBalance).toEqual(scoreBoardTableHeaderMock[9]);
  expect(efficiency).toEqual(scoreBoardTableHeaderMock[10]);
};

const validateLeaderboardBody = async (scoreBoardTableBodyMock, leaderboardTestsIds, page, apiPort, endpoint, actionTrigger) => {
  await page.waitForTimeout(500);


  const { body: scoreBoardTableResponse } = await waitForResponse({
    page,
    trigger: () => actionTrigger(),
    expectedRequestType: 'script',
    expectedRequestMethod: 'GET',
    expectedResponseStatus: 200,
    expectedResponseUrl: `${URL(apiPort).BASE_URL}${endpoint}`
  });
  const newScoreBoardTableResponse = normalizeString(scoreBoardTableResponse)

  expect(newScoreBoardTableResponse).toEqual(scoreBoardTableBodyMock);

  const clubs = scoreBoardTableBodyMock.map((el, index) => ({ id: `${index + 1}`, ...el }));

  const { table: { body } } = leaderboardTestsIds;

  for (const club of clubs) {
    await page.waitForTimeout(500);

    const clubId = await page.$eval(body.classification(club.id), (el) => el.innerText);
    const clubName = await page.$eval(body.clubName(club.id), (el) => el.innerText);
    const clubPoints = await page.$eval(body.totalPoints(club.id), (el) => el.innerText);
    const clubGames = await page.$eval(body.totalGames(club.id), (el) => el.innerText);
    const clubVictories = await page.$eval(body.totalVictories(club.id), (el) => el.innerText);
    const clubDraws = await page.$eval(body.totalDraws(club.id), (el) => el.innerText);
    const clubLooses = await page.$eval(body.totalLosses(club.id), (el) => el.innerText);
    const clubGoalsFavor = await page.$eval(body.goalsFavor(club.id), (el) => el.innerText);
    const clubGoalsOwn = await page.$eval(body.goalsOwn(club.id), (el) => el.innerText);
    const clubGoalsBalance = await page.$eval(body.goalsBalance(club.id), (el) => el.innerText);
    const clubEfficiency = await page.$eval(body.efficiency(club.id), (el) => el.innerText);

    expect(clubId).toEqual(club.id);
    expect(clubName).toEqual(club.name);
    expect(clubPoints).toEqual(club.totalPoints);
    expect(clubGames).toEqual(club.totalGames);
    expect(clubVictories).toEqual(club.totalVictories);
    expect(clubDraws).toEqual(club.totalDraws);
    expect(clubLooses).toEqual(club.totalLosses);
    expect(clubGoalsFavor).toEqual(club.goalsFavor);
    expect(clubGoalsOwn).toEqual(club.goalsOwn);
    expect(clubGoalsBalance).toEqual(club.goalsBalance);
    expect(clubEfficiency).toEqual(club.efficiency);
  }
};

module.exports = {
  validateLeaderboardHeader,
  validateLeaderboardBody,
};
