const { test, expect } = require('@playwright/test');

// Use same test data as TC01
const name = 'TestAuto001';
const email = 'TestAuto001@gmail.com';
const password = 'TestPassword1';

test('Login User with correct email and password', async ({ page }) => {
  // 1. Launch browser (handled by Playwright)
  // 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click on 'Signup / Login' button
  await page.locator('a:has-text("Signup / Login")').click();

  // 5. Verify 'Login to your account' is visible
  await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();

  // 6. Enter correct email address and password
  await page.locator('input[data-qa="login-email"]').fill(email);
  await page.locator('input[data-qa="login-password"]').fill(password);

  // 7. Click 'login' button
  await page.locator('button[data-qa="login-button"]').click();

  // 8. Verify that 'Logged in as username' is visible
  await expect(page.locator(`a:has-text("Logged in as ${name}")`)).toBeVisible();

  // Do NOT delete the account here.
  // This ensures the account remains available for other tests.
});

// 10. Verify that 'ACCOUNT DELETED!' is visible
// await expect(page.locator('b:has-text("Account Deleted!")')).toBeVisible();
