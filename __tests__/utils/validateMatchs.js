const { containerPorts } = require('../config/constants');
const { pageMatchs } = require('./dataTestIds');
const { URL } = require('./urls');
const waitForResponse = require('./waitForResponse');

const validateMatchs = async (page, optionShowFinishMatch, expectedResult, isAdmin) => {
  await page.waitForTimeout(500);

  await page.select(pageMatchs.optionShowFinishMatch, optionShowFinishMatch);
  const searchMatchsBtn = await page.$(pageMatchs.searchMatchsBtn);
  await searchMatchsBtn.click();

  for (const matchs of expectedResult) {
    await page.waitForTimeout(500);

    const homeTeam = await page.$eval(pageMatchs.homeTeam(matchs.id), (el) => el.innerText);
    const homeTeamGoals = await page.$eval(pageMatchs.homeTeamGoals(matchs.id), (el) => el.innerText);
    const awayTeam = await page.$eval(pageMatchs.awayTeam(matchs.id), (el) => el.innerText);
    const awatyTeamGoals = await page.$eval(pageMatchs.awayTeamGoals(matchs.id), (el) => el.innerText);
    const matchStatus = await page.$eval(pageMatchs.matchStatus(matchs.id), (el) => el.innerText);

    expect(homeTeam).toEqual(matchs.home_team);
    expect(homeTeamGoals).toEqual(matchs.home_team_goals);
    expect(awayTeam).toEqual(matchs.away_team);
    expect(awatyTeamGoals).toEqual(matchs.away_team_goals);

    if (matchs.in_progress) {
      expect(matchStatus).toEqual('Em andamento');
    } else {
      expect(matchStatus).toEqual('Finalizado');
    }

    if (isAdmin) {
      const matchStatusBtn = await page.$eval(pageMatchs.matchStatusBtn(matchs.id), (el) => el.disabled);

      if (matchs.in_progress) {
        expect(matchStatusBtn).toEqual(false);
      } else {
        expect(matchStatusBtn).toEqual(true);
      }
    }
  }
};

module.exports = {
  validateMatchs,
};
