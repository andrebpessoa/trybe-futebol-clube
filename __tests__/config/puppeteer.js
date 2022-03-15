const puppeteer = require('puppeteer');
const { puppeteerDefs: { headless, slowMo } } = require('./constants');

const initBrowser = async () => {
  const {CHROME_BIN: executablePath} = process.env;

  const browser = await puppeteer.launch({
    product: "chrome",
    executablePath,
    args: [
      '--no-sandbox',
      '--disable-gpu',
      '--disable-software-rasterizer',
      '--disable-dev-shm-usage',
      '--disable-extensions',
      '--window-size=1270,720',
    ],
    defaultViewport: { width: 1260, height: 590 },
    slowMo,
    waitForInitialPage: true,
    headless,
  });

  const context = await browser.createIncognitoBrowserContext();

  const page =
    (await context.pages())[1] ||
    (await context.newPage());

  context
    .on("targetdestroyed", async () => browser?.close().catch(()=>true));

  page
    .on("targetdestroyed", async () => browser?.close().catch(()=>true));

  await page.setCacheEnabled(false);

  return [{browser, context}, page];
};

const termBrowser = async ({browser, context}) => {
  await context?.close().catch(()=>true)
  await browser?.close().catch(()=>true);
};

module.exports = {
  initBrowser,
  termBrowser,
};
