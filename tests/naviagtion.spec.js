const { test, expect } = require('@playwright/test');

test('has link to login page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Simulate clicking on the link with text "Sign In", navigating to the login page
  await page.click("text=Sign In");
  // Check if the URL is correct
  await expect(page).toHaveURL('http://localhost:3000/user/signin');
  // Check if the login page has an h1 element with the text "Sign In"
  await expect(page.locator('main h1')).toContainText('Sign In');
});