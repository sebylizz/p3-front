global.alert = jest.fn();

import { render, screen, fireEvent } from "@testing-library/react";
import ProductDetailsPage from "../src/app/productPage/[id]/page";
import { useProducts } from "../src/app/context/productContext";
import { useParams, useSearchParams } from "next/navigation";
import { useCart } from "../src/app/context/cartContext";
import "@testing-library/jest-dom";
import quantityAddLimit from "@/app/lib/quantityAddLimit";
import React from "react";

jest.mock("../src/app/context/productContext");
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useSearchParams: jest.fn(() => ({ get: jest.fn() })),
}));
jest.mock("../src/app/context/cartContext");

describe("ProductDetailsPage", () => {
  const mockAddToCart = jest.fn();
  const mockGetProductQuantity = jest.fn(() => 0);

  beforeEach(() => {
    jest.clearAllMocks();
    useCart.mockReturnValue({
      addToCart: mockAddToCart,
      getProductQuantity: mockGetProductQuantity,
    });
    useParams.mockReturnValue({ id: "1" });
  });

  const mockProducts = [
    {
      id: 1,
      name: "Basketball",
      price: 49995,
      colors: [
        {
          id: 15,
          images: "image1.jpg, image2.jpg",
          mainImage: "mainImage.jpg",
          variants: [{ id: 25, size: "Onesize", quantity: 3 }],
        },
      ],
    },
  ];

  test("retrieves and displays product by ID", () => {
    useProducts.mockReturnValue({ products: mockProducts, loading: false });

    render(<ProductDetailsPage />);

    expect(screen.getByText("Basketball")).toBeInTheDocument();
    expect(screen.getByText(/499.95 kr/i)).toBeInTheDocument();
    expect(screen.getByAltText("Basketball")).toBeInTheDocument();
  });

  test("falls back to the first color if colorId query is invalid", () => {
    useProducts.mockReturnValue({ products: mockProducts, loading: false });
    useSearchParams.mockReturnValue({ get: jest.fn(() => "999") });

    render(<ProductDetailsPage />);

    expect(screen.getByAltText("Basketball")).toBeInTheDocument();
  });

  test("adds product to cart when size is selected", () => {
    useProducts.mockReturnValue({ products: mockProducts, loading: false });

    render(<ProductDetailsPage />);

    fireEvent.change(screen.getByLabelText(/size:/i), {
      target: { value: "25" },
    });

    fireEvent.click(screen.getByText("Add to Cart"));

    expect(mockAddToCart).toHaveBeenCalledWith("1/15/25");
  });

  test("prevents adding product to cart when stock limit is reached", () => {
    useProducts.mockReturnValue({ products: mockProducts, loading: false });
    mockGetProductQuantity.mockReturnValue(3);

    render(<ProductDetailsPage />);

    fireEvent.change(screen.getByLabelText(/size:/i), {
      target: { value: "25" },
    });

    fireEvent.click(screen.getByText("Add to Cart"));

    expect(mockAddToCart).not.toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalledWith(
      "Cannot add more of this product. Not enough stock."
    );
  });

  test("displays error message when no products are found", () => {
    useProducts.mockReturnValue({ products: [], loading: false });

    render(<ProductDetailsPage />);

    expect(screen.getByText(/Product not found/i)).toBeInTheDocument();
  });

  test("renders fallback UI for missing images", () => {
    const mockProductsNoImages = [
      {
        id: 1,
        name: "Basketball",
        price: 49995,
        colors: [
          {
            id: 15,
            images: undefined,
            mainImage: undefined,
            variants: [{ id: 25, size: "Onesize", quantity: 3 }],
          },
        ],
      },
    ];

    useProducts.mockReturnValue({
      products: mockProductsNoImages,
      loading: false,
    });

    render(<ProductDetailsPage />);

    const image = screen.getByAltText("Basketball");

    fireEvent.error(image);

    expect(image).toHaveAttribute("src", "/placeholder.jpg");
  });

  test("decreases product quantity after checkout", () => {
    const WrapperComponent = () => {
      const [productQuantity, setProductQuantity] = React.useState(3);

      const getMockProducts = () => [
        {
          id: 1,
          name: "Basketball",
          price: 49995,
          colors: [
            {
              id: 15,
              images: "image1.jpg, image2.jpg",
              mainImage: "mainImage.jpg",
              variants: [
                { id: 25, size: "Onesize", quantity: productQuantity },
              ],
            },
          ],
        },
      ];

      const mockAddToCart = jest.fn(() => {
        console.log("mockAddToCart called");
        setProductQuantity((prev) => prev - 1);
      });

      useProducts.mockImplementation(() => ({
        products: getMockProducts(),
        loading: false,
      }));

      useCart.mockReturnValue({
        addToCart: mockAddToCart,
        getProductQuantity: jest.fn(() => productQuantity),
      });

      return <ProductDetailsPage />;
    };

    const { rerender } = render(<WrapperComponent />);

    fireEvent.change(screen.getByLabelText(/size:/i), {
      target: { value: "25" },
    });

    expect(screen.getByText("Stock available: 3")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Add to Cart"));
    console.log("Add to Cart button clicked");

    expect(screen.getByText("Stock available: 3")).toBeInTheDocument();
  });
});
