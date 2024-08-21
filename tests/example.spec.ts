import { test, expect } from "@playwright/test";

const LOCAL_URL = "http://localhost:3000";

test("Products list page and add to cart button to cookie", async ({
    page,
    context,
}) => {
    await page.goto(LOCAL_URL + "/productos");

    const listItem = page.getByRole("listitem").first();
    const list = page.getByRole("list").filter({ has: listItem });

    await expect(list).toBeVisible();
    await expect(listItem).toBeVisible();

    const addToCartButton = page.getByLabel("Añadir al carrito").first();

    await addToCartButton.click();
    await expect
        .poll(
            async () => {
                const expectedCookieName = "cart";
                const cookies = await context.cookies();
                return cookies.find(
                    (cookie) => cookie.name === expectedCookieName,
                );
            },
            {
                intervals: [1_000, 2_000, 10_000],
                message: "waiting for cart cookie save",
                timeout: 30000,
            },
        )
        .toBeTruthy();
});
