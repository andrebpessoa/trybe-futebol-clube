const { URL } = require('./urls');
const { pageLogin } = require('./dataTestIds');
const { user: { validUser }, admin: { validAdmin } } = require('./users');

const logAdmin = async (page, port) => {
  await page.waitForTimeout(500);

  const inputLogin = await page.$(pageLogin.inputEmail);
  await inputLogin.type(validAdmin.email);

  const inputPassword = await page.$(pageLogin.inputPassword);
  await inputPassword.type(validAdmin.password);

  const buttonLogin = await page.$(pageLogin.buttonLogin);

  await buttonLogin.click();

  await page.waitForTimeout(500);

  expect(await page.url()).toEqual(URL(port).URL_PAGE_MATCHS);
};

const logUser = async (page, port) => {
  await page.waitForTimeout(500);

  const inputLogin = await page.$(pageLogin.inputEmail);
  await inputLogin.type(validUser.email);

  const inputPassword = await page.$(pageLogin.inputPassword);
  await inputPassword.type(validUser.password);

  const buttonLogin = await page.$(pageLogin.buttonLogin);

  await buttonLogin.click();

  await page.waitForTimeout(500);

  expect(await page.url()).toEqual(URL(port).URL_PAGE_MATCHS);
};

module.exports = {
  logAdmin,
  logUser,
};
