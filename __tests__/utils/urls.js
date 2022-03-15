const { puppeteerDefs } = require("../config/constants");

const URL = (PORT = 3000) => ({
  BASE_URL: `${puppeteerDefs.baseUrl}:${PORT}`,
  URL_PAGE_LOGIN: `${puppeteerDefs.baseUrl}:${PORT}/login`,
  URL_PAGE_MATCHS: `${puppeteerDefs.baseUrl}:${PORT}/matchs`,
  URL_PAGE_MATCHS_SETTINGS: `${puppeteerDefs.baseUrl}:${PORT}/matchs/settings`,
  URL_PAGE_LEADERBOARD: `${puppeteerDefs.baseUrl}:${PORT}/leaderboard`,
});

module.exports = {
  URL,
};
