import { test, expect } from "@playwright/test";

test.describe("Client Onboarding Wizard", () => {
  test("completes 4-step wizard and creates client", async ({ page }) => {
    await page.goto("/clients/new");
    await expect(page.locator("h1")).toContainText("Onboard New Client");

    // Step 1: Basics
    await page.fill("#onb-name", "Test Client");
    await page.fill("#onb-email", "test@example.com");
    await page.fill("#onb-company", "Test Corp");
    await page.click('button:has-text("Next")');

    // Step 2: Details
    await page.fill("#onb-industry", "Technology");
    await page.fill("#onb-phone", "+1 555-9999");
    await page.click('button:has-text("Next")');

    // Step 3: Project
    await page.fill("#onb-projectType", "Website Redesign");
    await page.fill("#onb-budget", "$10,000 - $50,000");
    await page.click('button:has-text("Next")');

    // Step 4: Confirm
    await expect(page.locator("text=Test Client")).toBeVisible();
    await expect(page.locator("text=test@example.com")).toBeVisible();
    await page.check('input[type="checkbox"]');
    await page.click('button:has-text("Submit")');

    // Should redirect to clients page with success toast
    await expect(page).toHaveURL(/\/clients/, { timeout: 10000 });
  });

  test("validates required fields on step 1", async ({ page }) => {
    await page.goto("/clients/new");
    await page.click('button:has-text("Next")');
    // Should show validation errors, not advance
    await expect(page.locator('[role="alert"]')).toBeVisible();
  });
});
