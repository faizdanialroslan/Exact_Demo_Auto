const { test, expect } = require('@playwright/test');

test.only('Valid Credentials', async ({ browser }) => {

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



test('Invalid Test Credentials',async ({browser})=>
{

      // Create isolated browser context
       const context = await browser.newContext();
       const page = await context.newPage();
      // Go to login page
       await page.goto("https://commandcenter-stg.farmbyte.com/login");
       console.log(await page.title());
       // Fill email and password
       await page.locator("[type='email']").fill("superadmin001@gmail.com");
       await page.waitForTimeout(1000);
       await page.locator("[type='password']").fill("WrongPwd123");
       await page.waitForTimeout(1000);

      // Click the eye icon to view password once
      await page.locator('button[aria-label="toggle password visibility"]').click();
      await page.waitForTimeout(2000);
      // Submit form
       await page.locator("[type='submit']").click();
      // Wait for snackbar container (class might change, so use partial match)
      const snackbar = page.locator('[class*="Snackbar_snackbar"]');

      // Tunggu max 5s snackbar to visible
      await expect(snackbar).toBeVisible({ timeout: 5000 });

      // Print the error message text
      const message = await snackbar.textContent();
      console.log("Error Message Displayed:", message?.trim());

});


test('Login & Logout', async ({ browser }) => {

   // Create isolated browser context
   const context = await browser.newContext();
   const page = await context.newPage();
  // Go to login page
   await page.goto("https://commandcenter-stg.farmbyte.com/login");
   console.log(await page.title());
   // Fill email and password
   await page.locator("[type='email']").fill("superadmin001@gmail.com");
   await page.waitForTimeout(1000);
   await page.locator("[type='password']").fill("P@ssw0rd1");
   await page.waitForTimeout(1000);
   await page.locator("[type='submit']").click();
   await page.waitForTimeout(4000);
   await page.getByRole('button', { name: 'Logout' }).click();
   await page.waitForTimeout(1000);
   await page.getByRole('button', { name: 'Logout' }).first().click();
   await page.waitForTimeout(1000);
 });

test('test web login & logout by using codegen', async ({ page }) => {
  await page.goto('https://commandcenter-stg.farmbyte.com/login');
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('superadmin001@gmail.com');
  await page.waitForTimeout(1000);
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('P@ssw0rd1');
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'toggle password visibility' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('checkbox', { name: 'Remember me' }).check();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(4000);
  await page.getByRole('button', { name: 'Logout' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Logout' }).first().click();
});


test('OMS Quotation Cancelled', async ({ page }) => {
  await page.goto('https://commandcenter-stg.farmbyte.com/login');
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('superadmin001@gmail.com');
  await page.waitForTimeout(1000);
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('P@ssw0rd1');
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(4000);
  await page.locator('div').filter({ hasText: /^Purchase Orders$/ }).nth(1).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Quotation' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('combobox').filter({ hasText: 'Quotation Status' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('option', { name: 'Quotation Cancelled' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Go to next page' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Go to next page' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Go to next page' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Go to next page' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Go to next page' }).click();
  await page.waitForTimeout(1000);
});



test('OMS Quotation Status Filter Validation with Pagination and Spinner Wait', async ({ page }) => {
  // 1. Login
  await page.goto('https://commandcenter-stg.farmbyte.com/login');
  await page.locator('input[type="email"]').fill('superadmin001@gmail.com');
  await page.locator('input[type="password"]').fill('P@ssw0rd1');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(4000);

  // 2. Navigate to Quotation
  await page.locator('div').filter({ hasText: /^Purchase Orders$/ }).nth(1).click();
  await page.getByRole('link', { name: 'Quotation' }).click();
  await page.waitForTimeout(2000);

  // 3. Define statuses to test
  const statusesToTest = [
    'Quotation Pending',
    'Quotation Approved',
    'Quotation Cancelled'
  ];

  for (const status of statusesToTest) {
    console.log(`🔍 Testing filter: ${status}`);

    // Reopen the filter every time to avoid stale state
    const dropdown = page.getByRole('combobox').filter({ hasText: 'Quotation Status' });
    await dropdown.click();
    await page.waitForTimeout(500);
    await page.getByRole('option', { name: status }).click();

    // Wait for table to update (detect spinner or use table row reload)
    const spinner = page.locator('.spinner, .loading-indicator, .ant-spin, .MuiCircularProgress-root');
    if (await spinner.isVisible()) {
      await spinner.waitFor({ state: 'hidden', timeout: 10000 });
    }

    await page.waitForSelector('table tbody tr'); // Wait for rows to appear
    await page.waitForTimeout(1000); // Add slight buffer

    let hasNextPage = true;

    while (hasNextPage) {
      // Wait for table rows to appear
      await page.waitForSelector('table tbody tr');
      const rows = await page.locator('table tbody tr');
      const rowCount = await rows.count();

      console.log(`📄 Rows found on this page: ${rowCount}`);

      for (let i = 0; i < rowCount; i++) {
        const statusCell = await rows.nth(i).locator('td').nth(2); // Adjust index if needed
        const statusText = (await statusCell.innerText())?.toLowerCase().trim();

        console.log(`🔎 Row ${i + 1}: "${statusText}" vs expected "${status.toLowerCase()}"`);

        // Soft assert to continue checking all rows even if one fails
        expect(statusText).toContain(status.toLowerCase());
      }

      // Handle pagination
      const nextButton = page.getByRole('button', { name: 'Go to next page' });

      if (await nextButton.isDisabled()) {
        hasNextPage = false;
        console.log(`✅ Done checking all pages for: ${status}`);
      } else {
        await nextButton.click();
        await page.waitForTimeout(1500); // Slight buffer for next page load

        // Wait for spinner again if next page has loading
        if (await spinner.isVisible()) {
          await spinner.waitFor({ state: 'hidden', timeout: 10000 });
        }
      }
    }
  }

  console.log('🎉 All filters validated successfully!');
});


test('🧪 Validate Quotation Status Column with Debug Print', async ({ page }) => {
  // 1. Login
  await page.goto('https://commandcenter-stg.farmbyte.com/login');
  await page.locator('input[type="email"]').fill('superadmin001@gmail.com');
  await page.locator('input[type="password"]').fill('P@ssw0rd1');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(4000);

  // 2. Navigate to Quotation
  await page.locator('div').filter({ hasText: /^Purchase Orders$/ }).nth(1).click();
  await page.getByRole('link', { name: 'Quotation' }).click();
  await page.waitForTimeout(2000);

  // 3. Define statuses to test
  const statusesToTest = [
    'Quotation Pending',
    'Quotation Approved',
    'Quotation Cancelled'
  ];

  for (const status of statusesToTest) {
    console.log(`\n🔍 Testing filter: ${status}`);

    // 4. Apply status filter
    const dropdown = page.getByRole('combobox').filter({ hasText: 'Quotation Status' });
    await dropdown.click();
    await page.waitForTimeout(500);
    await page.getByRole('option', { name: status }).click();

    // Wait for possible spinner
    const spinner = page.locator('.spinner, .loading-indicator, .ant-spin, .MuiCircularProgress-root');
    if (await spinner.isVisible()) {
      await spinner.waitFor({ state: 'hidden', timeout: 10000 });
    }

    await page.waitForSelector('table tbody tr');
    await page.waitForTimeout(1000); // slight delay to ensure table updated

    let hasNextPage = true;

    while (hasNextPage) {
      await page.waitForSelector('table tbody tr');
      const rows = await page.locator('table tbody tr');
      const rowCount = await rows.count();
      console.log(`📄 Rows found on this page: ${rowCount}`);

      for (let i = 0; i < rowCount; i++) {
        const cellCount = await rows.nth(i).locator('td').count();
        console.log(`🧾 Row ${i + 1}:`);

        for (let j = 0; j < cellCount; j++) {
          const cellText = await rows.nth(i).locator('td').nth(j).innerText();
          console.log(`  [${j}] ${cellText}`);
        }

        // ✅ AFTER identifying the correct index (e.g. index 4), uncomment below:
        const statusCell = await rows.nth(i).locator('td').nth(2); // Example index
        const statusText = (await statusCell.innerText())?.toLowerCase().trim();
        expect(statusText).toContain(status.toLowerCase());
      }

      // Pagination
      const nextButton = page.getByRole('button', { name: 'Go to next page' });

      if (await nextButton.isDisabled()) {
        hasNextPage = false;
        console.log(`✅ Done checking all pages for: ${status}`);
      } else {
        await nextButton.click();
        await page.waitForTimeout(1500);
        if (await spinner.isVisible()) {
          await spinner.waitFor({ state: 'hidden', timeout: 10000 });
        }
      }
    }
  }

  console.log('\n🎉 Debug complete! Use printed column index to finalize validation.');
});

// //------------------------------------------------------------------
// import { test, expect } from '@playwright/test';
// import path from 'path';
// import fs from 'fs';
// import { generateExcelReport } from './test data.js';

// test('Login with valid credentials', async ({ page }) => {
//   let screenshotPath = '';
//   let step = 1;
//   const screenshotsDir = path.resolve('./screenshots/web_test_TC04');
//   if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

//   let result = 'PASS';
//   let errorMsg = '';
//   try {
//     // Step 1: Navigate to login page
//     console.log("Step 1: Navigate to login page");
//     await page.goto('https://commandcenter-stg.farmbyte.com/login');
//     await page.waitForLoadState('networkidle');
//     screenshotPath = path.join(screenshotsDir, `step${step++}_login_page.png`);
//     await page.screenshot({ path: screenshotPath });

//     await page.locator('input[type="email"]').click();
//     await page.locator('input[type="email"]').fill('superadmin001@gmail.com');
//     await page.locator('input[type="password"]').click();
//     await page.locator('input[type="password"]').fill('P@ssw0rd1');
//     screenshotPath = path.join(screenshotsDir, `step${step++}_credentials_filled.png`);
//     await page.screenshot({ path: screenshotPath });

//     await page.getByRole('button', { name: 'toggle password visibility' }).click();
//     screenshotPath = path.join(screenshotsDir, `step${step++}_password_visible.png`);
//     await page.screenshot({ path: screenshotPath });

//     await page.getByRole('button', { name: 'Login' }).click();

//     // Optionally add assertion for login success
//     // await expect(page).toHaveURL(/dashboard|home/);
//   } catch (err) {
//     result = 'FAIL';
//     errorMsg = err.message;
//   }

//   await generateExcelReport({
//     module: 'Web_Login',
//     tcId: 'TC04',
//     scenario: 'Login with valid credentials',
//     result,
//     screenshotDir: screenshotsDir,
//   });
// });