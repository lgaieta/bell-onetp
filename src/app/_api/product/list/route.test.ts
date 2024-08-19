import { GET } from "@/app/_api/product/list/route";
import { expect, test } from "vitest";

test("should return data with status 200", async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
});
