const { test, expect } = require('@playwright/test');

test('logs in and returns the page it ends up on after logging in', async ({ page }) => {
  // Go to the sign-in page
  await page.goto('http://localhost:3000/user/signin');

  // Fill in the email and password fields
  await page.getByLabel('Email address').fill("didrikhsant@gmail.com");
  await page.getByLabel('Password').fill("123456");

  // Click the sign-in button
  await page.locator('main').getByRole('button', { name: 'Sign in' }).click();

  // Wait for navigation after logging in
  await page.waitForURL('http://localhost:3000/');

  // Get the current URL
  await page.goto('http://localhost:3000/user/profile');

  // Log the current URL to the console
  await expect(page).toHaveURL('http://localhost:3000/user/profile');

});

test('redirects to sign-in page when accessing profile page without logging in', async ({ page }) => {
  // Go to the profile page
  await page.goto('http://localhost:3000/user/profile');

  // Wait for navigation to the sign-in page
  await page.waitForURL('http://localhost:3000/user/signin?returnUrl=/user/profile');

  // Check if the URL is correct
  await expect(page).toHaveURL('http://localhost:3000/user/signin?returnUrl=/user/profile');

  // Optionally, check if the sign-in page has an h1 element with the text "Sign In"
  await expect(page.locator('main h1')).toContainText('Sign In');
});