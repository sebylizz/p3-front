global.alert = jest.fn();

import { render, screen, fireEvent } from "@testing-library/react";
import CartPage from "../src/app/cart/page";
import { useCart } from "../src/app/context/cartContext";
import { useProducts } from "../src/app/context/productContext";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

jest.mock("../src/app/context/cartContext", () => ({
  useCart: jest.fn(),
}));

jest.mock("../src/app/context/productContext", () => ({
  useProducts: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("CartPage Component", () => {
  const mockRouterPush = jest.fn();
  const mockIncreaseQuantity = jest.fn();
  const mockDecreaseQuantity = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push: mockRouterPush });
  });
  test('displays "Your Cart is Empty" when the cart is empty', () => {
    useCart.mockReturnValue({
      cart: [],
      increaseQuantity: jest.fn(),
      decreaseQuantity: jest.fn(),
    });

    useProducts.mockReturnValue({
      products: [],
      isLoading: false,
    });

    render(<CartPage />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test("calls increaseQuantity and increases the quantity by 1", () => {
    const mockCart = ["1/15/25", "1/15/25", "1/15/25", "1/15/25"];
    const mockProducts = [
      {
        id: 1,
        name: "Basketball",
        price: 49995,
        colors: [
          {
            id: 15,
            mainImage: "basketball.jpg",
            variants: [{ id: 25, quantity: 10 }],
          },
        ],
      },
    ];

    const getProductQuantity = jest.fn().mockImplementation(() => 4);

    useCart.mockReturnValue({
      cart: mockCart,
      increaseQuantity: mockIncreaseQuantity,
      decreaseQuantity: jest.fn(),
      getProductQuantity,
    });

    useProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
    });

    render(<CartPage />);

    const plusButton = screen.getByRole("button", { name: "+" });
    fireEvent.click(plusButton);

    expect(mockIncreaseQuantity).toHaveBeenCalledWith("1/15/25");
    expect(getProductQuantity()).toBe(4);
    expect(getProductQuantity()).not.toBe(5);
  });

  test("calls decreaseQuantity and decreases the quantity by 1", () => {
    const mockCart = ["1/15/25", "1/15/25", "1/15/25", "1/15/25", "1/15/25"];
    const mockProducts = [
      {
        id: 1,
        name: "Basketball",
        price: 49995,
        colors: [
          {
            id: 15,
            mainImage: "basketball.jpg",
            variants: [{ id: 25, quantity: 10 }],
          },
        ],
      },
    ];

    const getProductQuantity = jest.fn().mockImplementation(() => 5);

    useCart.mockReturnValue({
      cart: mockCart,
      increaseQuantity: jest.fn(),
      decreaseQuantity: mockDecreaseQuantity,
      getProductQuantity,
    });

    useProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
    });

    render(<CartPage />);

    const minusButton = screen.getByRole("button", { name: "-" });
    fireEvent.click(minusButton);

    expect(mockDecreaseQuantity).toHaveBeenCalledWith("1/15/25");
    expect(getProductQuantity()).toBe(5);
    expect(getProductQuantity()).not.toBe(4);
  });

  test("does not allow increasing quantity beyond stock limit", () => {
    const mockCart = ["1/15/25", "1/15/25", "1/15/25"];
    const mockProducts = [
      {
        id: 1,
        name: "Basketball",
        price: 49995,
        colors: [
          {
            id: 15,
            mainImage: "basketball.jpg",
            variants: [{ id: 25, quantity: 3 }],
          },
        ],
      },
    ];

    const getProductQuantity = jest.fn().mockReturnValue(3);

    useCart.mockReturnValue({
      cart: mockCart,
      increaseQuantity: mockIncreaseQuantity,
      decreaseQuantity: jest.fn(),
      getProductQuantity,
    });

    useProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
    });

    render(<CartPage />);

    const plusButton = screen.getByRole("button", { name: "+" });
    fireEvent.click(plusButton);

    expect(mockIncreaseQuantity).not.toHaveBeenCalled();
  });

  test('removes the item when "-" is clicked and quantity is 1', () => {
    let mockCart = ["1/15/25"];
    const mockProducts = [
      {
        id: 1,
        name: "Basketball",
        price: 49995,
        colors: [
          { id: 15, mainImage: "basketball.jpg", variants: [{ id: 25 }] },
        ],
      },
    ];

    const mockDecreaseQuantity = jest.fn(() => {
      mockCart = [];
    });

    useCart.mockImplementation(() => ({
      cart: mockCart,
      increaseQuantity: jest.fn(),
      decreaseQuantity: mockDecreaseQuantity,
      getProductQuantity: jest.fn().mockReturnValue(1),
    }));

    useProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
    });

    const { rerender } = render(<CartPage />);

    const minusButton = screen.getByRole("button", { name: "-" });
    fireEvent.click(minusButton);

    rerender(<CartPage />);

    expect(mockDecreaseQuantity).toHaveBeenCalledWith("1/15/25");
    expect(screen.queryByText("Basketball")).not.toBeInTheDocument();
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});
