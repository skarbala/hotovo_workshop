import test, { expect } from "@playwright/test";

test("it displays quote on button click", async ({ page }) => {
  //1. otvorim stranku
  await page.goto("http://localhost:8080/#/quotes");
  //2. kliknem na button
  await page.locator('[data-test="get-quote"]').click();
  //3. overim ze hlaska sa zobrazila
  await expect(page.locator("ul.quote-list").locator("li")).toBeVisible();
  await expect(page.locator("ul.quote-list").locator("li")).toHaveCount(1);
});

test("remove quote button is disabled on page open", async ({ page }) => {
  await page.goto("http://localhost:8080/#/quotes");
  await expect(page.getByRole("button", { name: "Remove Quote" })).toBeDisabled();
});

test("wisdom points increase by 5 after five Get Quote clicks", async ({
  page,
}) => {
  const numberOfClicks = 5;
  await page.goto("http://localhost:8080/#/quotes");
  const getQuoteButton = page.getByRole("button", { name: "Get Quote" });


  for (let i = 0; i < numberOfClicks; i++) {
    await getQuoteButton.click();
    await expect(page.locator('p[data-test="wisdom-points"]')).toContainText((i + 1).toString());
  }
  await expect(page.locator('p[data-test="wisdom-points"]')).toContainText(numberOfClicks.toString());
});

// samostatná práca
// 1. overte ze button remove quote je po otvoreni stranky disabled
// 2. 5x kliknite na add quote a overte wisdom points (+5)
// 3. overte hlasku ktora sa zobrazi ak je list prazdny

//https://github.com/skarbala/hotovo_workshop
