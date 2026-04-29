import { expect, test } from "@playwright/test";

test("home shows core marketplace promise", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("faciliteaGO").first()).toBeVisible();
  await expect(page.getByText("Compra cerca. Ayuda a tu barrio.")).toBeVisible();
  await expect(page.getByText("FINBROADPEAK26")).toBeVisible();
  await expect(page.getByText("JuanIAs").first()).toBeVisible();
});

test("main portals are reachable", async ({ page }) => {
  await page.goto("/usuario");
  await expect(page.getByText("Tus compras en faciliteaGO")).toBeVisible();
  await page.goto("/comercio");
  await expect(page.getByText("Ferreteria Ramblas Pro")).toBeVisible();
  await page.goto("/admin");
  await expect(page.getByText("Gobierno completo del marketplace")).toBeVisible();
});
