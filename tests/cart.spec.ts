import { test, expect, BrowserContext, Cookie } from "@playwright/test";

const LOCAL_URL = "http://localhost:3000";

const hasCartCookie = async (context: BrowserContext) => {
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
};

test.describe("Cart testing", () => {
    test("Click on add to cart button", async ({ page, context }) => {
        await page.goto(LOCAL_URL + "/productos");

        const listItem = page.getByRole("listitem").first();
        const list = page.getByRole("list").filter({ has: listItem });

        await expect(list).toBeVisible();
        await expect(listItem).toBeVisible();

        const addToCartButton = page.getByLabel("Añadir al carrito").first();

        await addToCartButton.click();
        await hasCartCookie(context);
    });

    test("Cart products load", async ({ page, context }) => {
        await page.goto(LOCAL_URL + "/productos");
        const addToCartButton = page.getByLabel("Añadir al carrito").first();

        await addToCartButton.click();
        await hasCartCookie(context);
        await page.goto(LOCAL_URL + "/carrito");

        await hasCartCookie(context);

        const emptyCartP = page.getByText(
            "Agrega al menos un producto a tu carrito de compras para comenzar.",
        );

        await expect(
            emptyCartP,
            "Check empty cart text doesn't exist",
        ).toHaveCount(0);
    });
});
