const { test, expect } = require('@playwright/test');

// Use same credentials as TC01/TC02
const name = 'TestAuto001';
const email = 'TestAuto001@gmail.com';
const password = 'TestPassword1';

test('Delete Account', async ({ page }) => {
  await page.goto('http://automationexercise.com');
  await expect(page).toHaveTitle(/Automation Exercise/);
  await page.locator('a:has-text("Signup / Login")').click();
  await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();
  await page.locator('input[data-qa="login-email"]').fill(email);
  await page.locator('input[data-qa="login-password"]').fill(password);
  await page.locator('button[data-qa="login-button"]').click();
  await expect(page.locator(`a:has-text("Logged in as ${name}")`)).toBeVisible();

  // Delete account
  await page.locator('a:has-text("Delete Account")').click();
  await expect(page.locator('b:has-text("Account Deleted!")')).toBeVisible();
  // Optionally, click continue after deletion
  await page.locator('a[data-qa="continue-button"]').click();
  
});