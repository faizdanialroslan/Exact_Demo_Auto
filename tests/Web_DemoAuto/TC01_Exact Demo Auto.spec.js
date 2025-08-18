const { test, expect } = require('@playwright/test');

test('Valid Credentials', async ({ browser }) => {

  // Create a fresh browser context (like a new incognito window)
  const context = await browser.newContext();

  // Open a new tab (page) in the context
  const page = await context.newPage();

  // Navigate to the login page
  await page.goto("https://commandcenter-stg.farmbyte.com/login");

  // Print the current page title in the console for debugging
  console.log(await page.title());

  // Store the password in a variable so we can reuse it later for assertions
  const expectedPassword = "P@ssw0rd1";

  // Create a locator for the password input field
  // This matches either a password type input (before eye click) or a text type input (after eye click)
  const passwordInput = page.locator('input[type="password"], input[type="text"]');

  // Fill in the email field
  await page.locator("[type='email']").fill("superadmin001@gmail.com");
  await page.waitForTimeout(1000);

  // Fill in the password field with the expected password
  await passwordInput.fill(expectedPassword);
  await page.waitForTimeout(1000);

  // Click the eye icon to toggle password visibility
  // Using aria-label is a stable way to locate the button
  await page.locator('button[aria-label="toggle password visibility"]').click();
  await page.waitForTimeout(1000);

  // OPTIONAL: Wait until the input type changes to "text" to ensure password is visible before reading it
  await expect(passwordInput).toHaveAttribute("type", "text");
  await page.waitForTimeout(1000);

  // Get the input type after clicking the eye icon
  const inputType = await passwordInput.getAttribute("type");
  console.log("Password field type after clicking eye:", inputType);
  await page.waitForTimeout(1000);

  // Get the actual visible password text from the input field
  const visiblePwd = await passwordInput.inputValue();
  console.log("Visible password text:", visiblePwd);
  await page.waitForTimeout(1000);

  // Assertion: The visible password should match the expected password
  await expect(visiblePwd).toBe(expectedPassword);
  await page.waitForTimeout(1000);

  // Assertion: The input type should be "text" (meaning the password is visible)
  await expect(inputType).toBe("text");
  await page.waitForTimeout(1000);

  // Click the submit button to log in
  await page.locator("[type='submit']").click();
  await page.waitForTimeout(1000);
});