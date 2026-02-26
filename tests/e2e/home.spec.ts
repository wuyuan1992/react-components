import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/2026 Next App/);
  });

  test("has no detectable accessibility issues", async ({ page }) => {
    await page.goto("/");
    // Basic a11y check: page should have a main landmark
    await expect(page.locator("main, [role='main']").first()).toBeVisible();
  });
});
