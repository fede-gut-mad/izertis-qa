import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

const BASE_URL = 'https://demo.guru99.com/V4/';

const VALID_USER = 'mngr647434';
const VALID_PASSWORD = 'Anuzenu';

Given('I navigate to the login page', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');
  await this.page.goto(BASE_URL);
});

Then('the page title should be {string}', async function (this: CustomWorld, expectedTitle: string) {
  if (!this.page) throw new Error('Page is not initialized');
  const title = await this.page.title();
  await expect(title).toContain(expectedTitle);
});

Then('I should see the login form', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');

  await this.page.locator('input[name="uid"]').isVisible()
  await this.page.locator('input[name="password"]').isVisible();
  await this.page.locator('input[name="btnLogin"]').isVisible()
  await this.page.locator('input[name="btnReset"]').isVisible();
});

When(
  'I fill the login form with user {string} and password {string}',
  async function (this: CustomWorld, user: string, password: string) {
    if (!this.page) throw new Error('Page is not initialized');

    await this.page.locator('input[name="uid"]').fill(user);
    await this.page.locator('input[name="password"]').fill(password);
  }
);

When('I click the reset button', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');

  await this.page.locator('input[name="btnReset"]').click();
});

Then('the login form fields should be empty', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');

  await expect(this.page.locator('input[name="uid"]')).toHaveValue('');
  await expect(this.page.locator('input[name="password"]')).toHaveValue('');
});

When('I login with valid credentials', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');

  await this.page.locator('input[name="uid"]').fill(VALID_USER);
  await this.page.locator('input[name="password"]').fill(VALID_PASSWORD);
  await this.page.locator('input[name="btnLogin"]').click();
});

Then('I should see the manager home page', async function (this: CustomWorld) {
  if (!this.page) throw new Error('Page is not initialized');

  await this.page.waitForLoadState('networkidle');
  await expect(this.page.locator('tr.heading3')).toBeVisible();
  await expect(this.page.locator('tr.heading3 > td')).toContainText(VALID_USER);
});