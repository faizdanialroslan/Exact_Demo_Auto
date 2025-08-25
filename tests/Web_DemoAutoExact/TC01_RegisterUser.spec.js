const { test, expect } = require('@playwright/test');

test('Register User', async ({ page }) => {
  // 1. Launch browser (handled by Playwright)
  // 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click on 'Signup / Login' button
  await page.locator('a:has-text("Signup / Login")').click();

  // 5. Verify 'New User Signup!' is visible
  await expect(page.locator('h2:has-text("New User Signup!")')).toBeVisible();

  // 6. Enter name and email address
  await page.locator('input[name="name"]').fill('TestAuto001');
  await page.locator('input[data-qa="signup-email"]').fill('TestAuto001@gmail.com');

  // 7. Click 'Signup' button
  await page.locator('button[data-qa="signup-button"]').click();
  await page.waitForTimeout(1000);

  // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
  await expect(page.locator('b:has-text("Enter Account Information")')).toBeVisible();

  // 9. Fill details: Title, Name, Email, Password, Date of birth
  await page.locator('input[id="id_gender1"]').check(); // Title: Mr
  await page.locator('input[id="password"]').fill('TestPassword1');
  await page.locator('select[id="days"]').selectOption('1');
  await page.locator('select[id="months"]').selectOption('1');
  await page.locator('select[id="years"]').selectOption('2000');
  // 10. Select checkbox 'Sign up for our newsletter!'
  await page.locator('input[id="newsletter"]').check();

  // 11. Select checkbox 'Receive special offers from our partners!'
  await page.locator('input[id="optin"]').check();

  // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
  await page.locator('input[id="first_name"]').fill('Test');
  await page.locator('input[id="last_name"]').fill('Auto001');
  await page.locator('input[id="company"]').fill('TestCompany');
  await page.locator('input[id="address1"]').fill('123 Test Street');
  await page.locator('input[id="address2"]').fill('Suite 456');
  await page.locator('select[id="country"]').selectOption({ label: 'India' });
  await page.locator('input[id="state"]').fill('TestState');
  await page.locator('input[id="city"]').fill('TestCity');
  await page.locator('input[id="zipcode"]').fill('123456');
  await page.locator('input[id="mobile_number"]').fill('1234567890');

  // 13. Click 'Create Account button'
  await page.locator('button[data-qa="create-account"]').click();

  // 14. Verify that 'ACCOUNT CREATED!' is visible
  await expect(page.locator('b:has-text("Account Created!")')).toBeVisible();

  // 15. Click 'Continue' button
  await page.locator('a[data-qa="continue-button"]').click();

  // 16. Verify that 'Logged in as username' is visible
  await expect(page.locator('a:has-text("Logged in as TestAuto001")')).toBeVisible();

  // Add a wait to ensure account creation is fully processed before other tests run
  await page.waitForTimeout(2000);

  // Do NOT delete the account here.
  // This allows other tests (TC02, TC04) to use the same account for login/logout.
});