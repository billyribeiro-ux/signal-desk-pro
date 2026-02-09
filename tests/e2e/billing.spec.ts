import { test, expect } from "@playwright/test";

test.describe("Billing", () => {
  test("displays billing page with current plan", async ({ page }) => {
    await page.goto("/billing");
    await expect(page.locator("h1")).toContainText("Billing");
    // Wait for subscription data to load
    await expect(page.locator("text=Current Plan")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("text=Growth")).toBeVisible();
    await expect(page.locator("text=ACTIVE")).toBeVisible();
  });

  test("shows three plan cards", async ({ page }) => {
    await page.goto("/billing");
    await expect(page.locator("text=Starter")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("text=Growth")).toBeVisible();
    await expect(page.locator("text=Pro")).toBeVisible();
  });

  test("current plan button is disabled", async ({ page }) => {
    await page.goto("/billing");
    await expect(page.locator("text=Current Plan")).toBeVisible({ timeout: 10000 });
    const currentBtn = page.locator('button:has-text("Current Plan")');
    await expect(currentBtn).toBeDisabled();
  });
});
