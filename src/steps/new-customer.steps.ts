import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';


Given(`I am on the New Customer page`,  async function (this: CustomWorld)  {
    if (!this.page) throw new Error('Page is not initialized');
    await this.page.locator('a[href="addcustomerpage.php"]').click();
});

Then(`I should see the New Customer form`,  async function (this: CustomWorld)  {
    if (!this.page) throw new Error('Page is not initialized');
    await expect(this.page.locator('input[name="name"]')).toBeVisible();
    await expect(this.page.locator('input[name="rad1"]').first()).toBeVisible();
    await expect(this.page.locator('input[name="dob"]')).toBeVisible();
    await expect(this.page.locator('textarea[name="addr"]')).toBeVisible();
    await expect(this.page.locator('input[name="city"]')).toBeVisible();
    await expect(this.page.locator('input[name="state"]')).toBeVisible();
    await expect(this.page.locator('input[name="pinno"]')).toBeVisible();
    await expect(this.page.locator('input[name="telephoneno"]')).toBeVisible();
    await expect(this.page.locator('input[name="emailid"]')).toBeVisible();
    await expect(this.page.locator('input[name="password"]')).toBeVisible();
    await expect(this.page.locator('input[name="sub"]')).toBeVisible();
    await expect(this.page.locator('input[name="res"]')).toBeVisible();
});

When(`I submit the New Customer form without filling any field`,  async function (this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');

    this.page.on('dialog', async (dialog) => { 
        process.env.Message = await dialog.message();
        console.log('Dialog message:' + process.env.Message), 
        await dialog.accept(); 
    }); 
    
    await this.page.locator('input[name="sub"]').click();      
});

Then(`I should see an alert message`, async function (this: CustomWorld)  {
    if (!this.page) throw new Error('Page is not initialized');

    await expect(process.env.Message).toBe('please fill all fields');
});

When(`I fill the New Customer form with an invalid PIN {string}`,  async function (this: CustomWorld, pin: string)  {
      if (!this.page) throw new Error('Page is not initialized');
      await this.page.locator('input[name="pinno"]').fill(pin);
      await this.page.locator('input[name="pinno"]').blur();

});

Then(`I should see a PIN validation error`, async function (this: CustomWorld) {
      if (!this.page) throw new Error('Page is not initialized');
      await expect(this.page.locator('label#message6')).toBeVisible();
      await expect(this.page.locator('label#message6')).toHaveText('Characters are not allowed');

});

When(`I fill the New Customer form with an invalid email {string}`, async function (this: CustomWorld, email: string)  {
      if (!this.page) throw new Error('Page is not initialized');
      await this.page.locator('input[name="emailid"]').fill(email);
      await this.page.locator('input[name="emailid"]').blur();

});

Then(`I should see an email validation error`,async function (this: CustomWorld) {
    if (!this.page) throw new Error('Page is not initialized');
    await expect(this.page.locator('label#message9')).toBeVisible();
    await expect(this.page.locator('label#message9')).toHaveText('Email-ID is not valid');

});

When(`I fill the New Customer form with valid data`,async function (this: CustomWorld)  {
      if (!this.page) throw new Error('Page is not initialized');
      const uniqueEmail: string = `test_${Date.now()}@gmail.com` || '';
      const uniqueName: string = Array.from(
        { length: 8 }, 
        () => String.fromCharCode(97 + Math.floor(Math.random() * 26))
      ).join('');

      
      await this.page.locator('input[name="name"]').fill(uniqueName);
      await this.page.locator('input[name="dob"]').fill('1989-10-10');
      await this.page.locator('textarea[name="addr"]').fill('Lorem Ipsum');
      await this.page.locator('input[name="city"]').fill('Lorem Ipsum');
      await this.page.locator('input[name="state"]').fill('Lorem Ipsum');
      await this.page.locator('input[name="pinno"]').fill('123456');
      await this.page.locator('input[name="telephoneno"]').fill('645123789');
      await this.page.locator('input[name="emailid"]').fill(uniqueEmail);
      await this.page.locator('input[name="password"]').fill('Password123');
});

When(`I submit the New Customer form`,async function (this: CustomWorld)  {
      if (!this.page) throw new Error('Page is not initialized');
      await this.page.locator('input[name="sub"]').click();
});

Then(`I should see the new customer confirmation page`,async function (this: CustomWorld) {
      if (!this.page) throw new Error('Page is not initialized');
      await this.page.locator('table#customer').isVisible();
      await expect(this.page.locator('p.heading3')).toContainText('Customer Registered Successfully!!!');
});
