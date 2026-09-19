import { getProductsByCategory } from "../data";

describe("product catalog", () => {
  it("derives category listings from the detailed catalog", () => {
    const headphones = getProductsByCategory("headphones");

    expect(headphones.map((product) => product.slug)).toEqual([
      "xx99-mark-two-headphones",
      "xx99-mark-one-headphones",
      "xx59-headphones",
    ]);
    expect(
      headphones.every((product) => product.category === "headphones"),
    ).toBe(true);
  });

  it("orders new products before older products", () => {
    const speakers = getProductsByCategory("speakers");

    expect(speakers[0]).toMatchObject({ slug: "zx9-speaker", isNew: true });
    expect(speakers[1]).toMatchObject({ slug: "zx7-speaker", isNew: false });
  });
});
