import { Before, After, setDefaultTimeout, Status, ITestCaseHookParameter } from '@cucumber/cucumber';
import { chromium, firefox, Browser } from 'playwright';
import { CustomWorld } from './world';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://demo.guru99.com/V4/';
setDefaultTimeout(30 * 1000);
const headless = process.env.HEADLESS !== 'false';

Before(async function (this: CustomWorld) {
  const browserName = process.env.BROWSER || 'chromium';

  let browser: Browser;
  if (browserName === 'firefox') {
    browser = await firefox.launch({ headless});
  } else {
    browser = await chromium.launch({ headless});
  }

  const context = await browser.newContext();
  const page = await context.newPage();

  this.browser = browser;
  this.context = context;
  this.page = page;
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  const { result, pickle } = scenario;

  // 📸 Screenshot si el escenario falla
  if (result?.status === Status.FAILED && this.page) {
    const screenshotsDir = path.join('reports', 'screenshots');
    fs.mkdirSync(screenshotsDir, { recursive: true });

    const fileName =
      pickle.name.replace(/[^a-z0-9]+/gi, '_').toLowerCase() + '.png';

    await this.page.screenshot({
      path: path.join(screenshotsDir, fileName),
      fullPage: true,
    });
  }

  // shut down
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});
