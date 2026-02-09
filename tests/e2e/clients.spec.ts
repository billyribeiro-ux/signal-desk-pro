import { test, expect } from "@playwright/test";

test.describe("Client Management", () => {
  test("displays client list from API", async ({ page }) => {
    await page.goto("/clients");
    await expect(page.locator("h1")).toContainText("Clients");
    // Wait for data to load (skeleton disappears)
    await expect(page.locator("table")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("table tbody tr")).toHaveCount(8);
  });

  test("search filters clients", async ({ page }) => {
    await page.goto("/clients");
    await expect(page.locator("table")).toBeVisible({ timeout: 10000 });
    await page.fill('input[aria-label="Search clients"]', "Acme");
    // Wait for filtered results
    await page.waitForTimeout(500);
    const rows = page.locator("table tbody tr");
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("add client modal opens and validates", async ({ page }) => {
    await page.goto("/clients");
    await expect(page.locator("table")).toBeVisible({ timeout: 10000 });
    await page.click('button:has-text("Add Client")');
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(page.locator("text=Add New Client")).toBeVisible();

    // Submit empty form — should show validation errors
    await page.click('button:has-text("Create Client")');
    await expect(page.locator('[role="alert"]')).toBeVisible();
  });

  test("delete client shows confirm dialog", async ({ page }) => {
    await page.goto("/clients");
    await expect(page.locator("table")).toBeVisible({ timeout: 10000 });
    // Click first delete button
    await page.click('button[aria-label^="Delete"]');
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(page.locator("text=Delete Client")).toBeVisible();
    // Cancel
    await page.click('button:has-text("Cancel")');
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });
});
