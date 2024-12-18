global.alert = jest.fn();
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BrowseProductsPage from "@/app/browseProducts/page";
import { useProducts } from "@/app/context/productContext";
import getCategories from "@/app/lib/getCategories";
import "@testing-library/jest-dom";
import React from "react";

jest.mock("@/app/context/productContext");
jest.mock("@/app/lib/getCategories");
jest.mock(
  "@/app/components/browseProductSlider",
  () =>
    ({ filteredProducts }) =>
      (
        <div>
          {filteredProducts.map((product) => (
            <div key={product.id}>{product.name}</div>
          ))}
        </div>
      )
);

describe("BrowseProductsPage", () => {
  const mockProducts = [
    { id: 1, name: "Basketball", categoryId: 101 },
    { id: 2, name: "Football", categoryId: 102 },
    { id: 3, name: "Tennis Ball", categoryId: 103 },
  ];

  const mockCategories = [
    { id: 101, name: "Sports", parentCategory: null },
    { id: 102, name: "Outdoor", parentCategory: null },
    { id: 103, name: "Tennis", parentCategory: { id: 101 } },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    useProducts.mockReturnValue({ products: mockProducts });
    getCategories.mockResolvedValue(mockCategories);
  });

  test("renders all products by default", async () => {
    render(<BrowseProductsPage />);

    await waitFor(() => {
      expect(getCategories).toHaveBeenCalled();
    });

    expect(screen.getByText("Basketball")).toBeInTheDocument();
    expect(screen.getByText("Football")).toBeInTheDocument();
    expect(screen.getByText("Tennis Ball")).toBeInTheDocument();
  });

  test("filters products when a category is selected", async () => {
    render(<BrowseProductsPage />);

    await waitFor(() => {
      expect(getCategories).toHaveBeenCalled();
    });

    fireEvent.mouseDown(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("Sports"));

    await waitFor(() => {
      expect(screen.getByText("Basketball")).toBeInTheDocument();
      expect(screen.getByText("Tennis Ball")).toBeInTheDocument();
      expect(screen.queryByText("Football")).not.toBeInTheDocument();
    });
  });

  test('shows all products when "All" is selected', async () => {
    render(<BrowseProductsPage />);

    await waitFor(() => {
      expect(getCategories).toHaveBeenCalled();
    });

    fireEvent.mouseDown(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("Sports"));

    fireEvent.mouseDown(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("All"));

    await waitFor(() => {
      expect(screen.getByText("Basketball")).toBeInTheDocument();
      expect(screen.getByText("Football")).toBeInTheDocument();
      expect(screen.getByText("Tennis Ball")).toBeInTheDocument();
    });
  });

  test("filters products correctly for nested categories", async () => {
    render(<BrowseProductsPage />);

    await waitFor(() => {
      expect(getCategories).toHaveBeenCalled();
    });

    fireEvent.mouseDown(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("Tennis"));

    await waitFor(() => {
      expect(screen.getByText("Tennis Ball")).toBeInTheDocument();
      expect(screen.queryByText("Basketball")).not.toBeInTheDocument();
      expect(screen.queryByText("Football")).not.toBeInTheDocument();
    });
  });
});
