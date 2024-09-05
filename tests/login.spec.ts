import strings from "@/lib/strings";
import test, { expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";
const LOGIN_URL_PATH = "/iniciar-sesion";
const LOGIN_PAGE_URL = BASE_URL + LOGIN_URL_PATH;
const ADMIN_PAGE_URL = BASE_URL + "/";
const ADMIN_PRODUCTS_PAGE_URL = BASE_URL + "/productos/admin";

test("Login page loads successfully", async ({ page }) => {
    await page.goto(LOGIN_PAGE_URL);
    await expect(page).toHaveTitle(strings.user.login.page_title);
});

test("Login form elements are visible", async ({ page }) => {
    await page.goto(LOGIN_PAGE_URL);
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
});

test("Empty input shows validation error", async ({ page }) => {
    await page.goto(LOGIN_PAGE_URL);
    await page.click('button[type="submit"]');
    await expect(
        page.getByText(strings.user.login.empty_fields_error),
    ).toBeVisible();
});

test("Invalid email format shows error", async ({ page }) => {
    await page.goto(LOGIN_PAGE_URL);
    await page.fill('input[name="username"]', "invalid-email");
    await page.click('button[type="submit"]');
    await expect(
        page.getByText(strings.user.login.invalid_username),
    ).toBeVisible();
});

test("Successful login redirects to home", async ({ page }) => {
    await page.goto(LOGIN_PAGE_URL);
    await page.fill('input[name="username"]', "validUser");
    await page.fill('input[name="password"]', "validPassword");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(ADMIN_PAGE_URL);
});

test("Redirect to home page when navigate to /productos/admin", async ({
    page,
}) => {
    await page.goto(ADMIN_PRODUCTS_PAGE_URL);
    await expect(page).toHaveTitle(strings.home.page_title);
});
