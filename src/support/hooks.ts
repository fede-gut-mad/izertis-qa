import { Before, After,setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, Browser } from 'playwright';
import { CustomWorld } from './world';

const BASE_URL = 'https://demo.guru99.com/V4/';
setDefaultTimeout(30 * 1000);

Before(async function (this: CustomWorld) {
  const browserName = process.env.BROWSER || 'chromium';
  const headless = process.env.HEADLESS !== 'false';

  let browser: Browser;
  if (browserName === 'firefox') {
    browser = await firefox.launch({ headless });
  } else {
    browser = await chromium.launch({ headless});
  }

  const context = await browser.newContext();
  const page = await context.newPage();

  // save World
  this.browser = browser;
  this.context = context;
  this.page = page;


});

After(async function (this: CustomWorld) {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});
