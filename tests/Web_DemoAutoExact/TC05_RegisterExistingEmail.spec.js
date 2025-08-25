const { test, expect } = require('@playwright/test');

const name = 'TestAuto001';
const email = 'TestAuto001@gmail.com'; // already registered in TC01

test('Register User with existing email', async ({ page }) => {
  // 1. Launch browser (handled by Playwright)
  // 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click on 'Signup / Login' button
  await page.locator('a:has-text("Signup / Login")').click();

  // 5. Verify 'New User Signup!' is visible
  await expect(page.locator('h2:has-text("New User Signup!")')).toBeVisible();

  // 6. Enter name and already registered email address
  await page.locator('input[name="name"]').fill(name);
  await page.locator('input[data-qa="signup-email"]').fill(email);

  // 7. Click 'Signup' button
  await page.locator('button[data-qa="signup-button"]').click();

  // 8. Verify error 'Email Address already exist!' is visible
  await expect(page.locator('p:has-text("Email Address already exist!")')).toBeVisible();
});
