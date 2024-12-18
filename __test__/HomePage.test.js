import getTopSellingProductsUsingHeap from "@/app/lib/getBestSeller";
import productFetcher from "@/app/lib/GetProducts";

describe("getTopSellingProductsUsingHeap", () => {
  const mockProducts = [
    {
      id: 1,
      name: "Basketball",
      colors: [{ id: 15, totalSales: 5 }],
    },
    {
      id: 21,
      name: "T-shirt",
      colors: [
        { id: 16, totalSales: 9 },
        { id: 20, totalSales: 219 },
      ],
    },
    {
      id: 22,
      name: "Cap",
      colors: [{ id: 17, totalSales: 500 }],
    },
    {
      id: 24,
      name: "Sweatpants",
      colors: [{ id: 22, totalSales: 100 }],
    },
  ];

  test("returns the top N best-selling products sorted by totalSales", () => {
    const flattenedProducts = mockProducts.flatMap((product) =>
      product.colors.map((color) => ({
        productId: product.id,
        name: product.name,
        colorId: color.id,
        totalSales: color.totalSales,
      }))
    );

    const result = getTopSellingProductsUsingHeap(flattenedProducts, 3);

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({
      productId: 22,
      name: "Cap",
      colorId: 17,
      totalSales: 500,
    });
    expect(result[1]).toEqual({
      productId: 21,
      name: "T-shirt",
      colorId: 20,
      totalSales: 219,
    });
    expect(result[2]).toEqual({
      productId: 24,
      name: "Sweatpants",
      colorId: 22,
      totalSales: 100,
    });
  });

  test("returns all products if N is greater than the list size", () => {
    const flattenedProducts = mockProducts.flatMap((product) =>
      product.colors.map((color) => ({
        productId: product.id,
        name: product.name,
        colorId: color.id,
        totalSales: color.totalSales,
      }))
    );

    const result = getTopSellingProductsUsingHeap(flattenedProducts, 10);

    expect(result).toHaveLength(flattenedProducts.length);
  });

  test("returns an empty array when input list is empty", () => {
    const result = getTopSellingProductsUsingHeap([], 3);

    expect(result).toEqual([]);
  });
});

describe("productFetcher", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("returns data when fetch is successful", async () => {
    const mockData = [
      { id: 1, name: "Product A" },
      { id: 2, name: "Product B" },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const data = await productFetcher();

    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/products/getall");
    expect(data).toEqual(mockData);
  });

  test("throws an error when response is not ok", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const data = await productFetcher();

    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/products/getall");
    expect(data).toBeUndefined();
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error:", expect.any(Error));

    consoleErrorSpy.mockRestore();
  });

  test("handles network errors gracefully", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const data = await productFetcher();

    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/products/getall");
    expect(data).toBeUndefined();
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error:", expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});
