import { test, expect } from "@playwright/test";

test.describe("Revision Management", () => {
  test("displays revision list from API", async ({ page }) => {
    await page.goto("/revisions");
    await expect(page.locator("h1")).toContainText("Revisions");
    // Wait for data to load
    await expect(page.locator('[data-testid="revision-card"], .space-y-4 > div')).toHaveCount(7, { timeout: 10000 });
  });

  test("shows status badges with correct variants", async ({ page }) => {
    await page.goto("/revisions");
    await page.waitForTimeout(2000);
    // Check that at least one badge is visible
    await expect(page.locator("text=pending").first()).toBeVisible();
  });
});
