import { test, expect } from '@playwright/test';

test('Contact Us Form', async ({ page }) => {
  // 1. Launch browser (handled by Playwright)
  // 2. Navigate to url
  await page.goto('https://automationexercise.com/');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click on 'Contact Us' button
  await page.getByRole('link', { name: ' Contact us' }).click();

  // 5. Verify 'GET IN TOUCH' is visible
  await expect(page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();

  // 6. Enter name, email, subject and message
  await page.getByRole('textbox', { name: 'Name' }).fill('TestAuto001');
  await page.getByRole('textbox', { name: 'Email', exact: true }).fill('TestAuto001@gmail.com');
  await page.getByRole('textbox', { name: 'Subject' }).fill('Test Subject');
  await page.getByRole('textbox', { name: 'Your Message Here' }).fill('This is a test message.');

  // 7. Upload file using the actual file input element
  const filePath = '/Users/nurulazlin/Downloads/AutomationFileUpload.docx';
  const fs = require('fs');
  try {
    fs.accessSync(filePath, fs.constants.R_OK);
    console.log('File is readable');
  } catch (err) {
    throw new Error(`Cannot read file: ${filePath}. Check permissions.`);
  }
  await page.locator('input[name="upload_file"]').setInputFiles(filePath);
  await page.waitForTimeout(1000);


  //Handle alert (accept dialog)
    page.once('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.accept();
  });

  // 8. Click 'Submit' button
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(1000);

  // 10. Verify success message
  await expect(page.locator('div.status.alert-success')).toBeVisible();
  await expect(page.locator('div.status.alert-success')).toHaveText(/Success! Your details have been submitted successfully\./);

  // 11. Click 'Home' button and verify that landed to home page successfully
  await page.getByRole('link', { name: ' Home' }).click();
  await expect(page).toHaveTitle(/Automation Exercise/);
});




