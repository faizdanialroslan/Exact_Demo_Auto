const { test, expect } = require('@playwright/test');

test('Login User with incorrect email and password', async ({ page }) => {
  // 1. Launch browser (handled by Playwright)
  // 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click on 'Signup / Login' button
  await page.locator('a:has-text("Signup / Login")').click();

  // 5. Verify 'Login to your account' is visible
  await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();

  // 6. Enter incorrect email address and password
  await page.locator('input[data-qa="login-email"]').fill('wronguser@example.com');
  await page.locator('input[data-qa="login-password"]').fill('WrongPassword123');

  // 7. Click 'login' button
  await page.locator('button[data-qa="login-button"]').click();

  // 8. Verify error 'Your email or password is incorrect!' is visible
  await expect(page.locator('p:has-text("Your email or password is incorrect!")')).toBeVisible();
});
