const { test, expect } = require('@playwright/test');

test('Register User with existing email', async ({ page }) => {
  // 1. Launch browser (handled by Playwright)
  // 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click on 'Signup / Login' button
  await page.click('a[href="/login"]');

  // 5. Verify 'New User Signup!' is visible
  await expect(page.locator('text=New User Signup!')).toBeVisible();

  // 6. Enter name and already registered email address
  await page.fill('input[data-qa="signup-name"]', 'Test User');
  await page.fill('input[data-qa="signup-email"]', 'existing_email@example.com'); // Use an email that is already registered

  // 7. Click 'Signup' button
  await page.click('button[data-qa="signup-button"]');

  // 8. Verify error 'Email Address already exist!' is visible
  await expect(page.locator('text=Email Address already exist!')).toBeVisible();
  });