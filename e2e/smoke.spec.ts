import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("homepage loads", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/SignalDesk Pro/);
  });

  test("dashboard page loads", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.locator("h1")).toContainText("Dashboard");
  });

  test("clients page loads", async ({ page }) => {
    await page.goto("/clients");
    await expect(page.locator("h1")).toContainText("Clients");
  });

  test("projects page loads", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.locator("h1")).toContainText("Projects");
  });

  test("revisions page loads", async ({ page }) => {
    await page.goto("/revisions");
    await expect(page.locator("h1")).toContainText("Revisions");
  });

  test("settings page loads", async ({ page }) => {
    await page.goto("/settings");
    await expect(page.locator("h1")).toContainText("Settings");
  });
});
