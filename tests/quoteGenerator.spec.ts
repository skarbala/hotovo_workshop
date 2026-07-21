import test, { expect } from "@playwright/test";

test.describe("Quote Generator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8080/#/quotes");
  });

  test("it displays quote on button click", async ({ page }) => {
    await page.locator('[data-test="get-quote"]').click();
    await expect(page.locator("ul.quote-list").locator("li")).toBeVisible();
    await expect(page.locator("ul.quote-list").locator("li")).toHaveCount(1);
  });

  test("remove quote button is disabled on page open", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Remove Quote" }),
    ).toBeDisabled();
  });

  test("wisdom points increase by 5 after five Get Quote clicks", async ({
    page,
  }) => {
    const numberOfClicks = 5;
    const getQuoteButton = page.getByRole("button", { name: "Get Quote" });

    for (let i = 0; i < numberOfClicks; i++) {
      await getQuoteButton.click();
      await expect(page.locator('p[data-test="wisdom-points"]')).toContainText(
        (i + 1).toString(),
      );
    }
    await expect(page.locator('p[data-test="wisdom-points"]')).toContainText(
      numberOfClicks.toString(),
    );
  });

  test("empty list shows prompt message", async ({ page }) => {
    await expect(
      page.getByText("Click the button to get some wisdom"),
    ).toBeVisible();
  });
});
