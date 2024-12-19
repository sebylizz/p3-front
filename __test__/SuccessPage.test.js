global.alert = jest.fn();

import { render, screen, waitFor } from "@testing-library/react";
import SuccessPage from "@/app/success/page";
import verifyPayment from "@/app/lib/verifyPayment";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/app/context/cartContext";
import "@testing-library/jest-dom";

jest.mock("@/app/lib/verifyPayment");
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));
jest.mock("@/app/context/cartContext");

describe("SuccessPage", () => {
  const mockClearCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useSearchParams.mockReturnValue({
      get: jest.fn(() => "test-session-id"),
    });
    useCart.mockReturnValue({
      clearCart: mockClearCart,
    });
  });

  test("clears the cart when payment is successful", async () => {
    verifyPayment.mockResolvedValue({ success: true });

    render(<SuccessPage />);

    await waitFor(() => {
      expect(verifyPayment).toHaveBeenCalledWith("test-session-id");
      expect(mockClearCart).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText(/Order placed successfully!/i)).toBeInTheDocument();
  });

  test("does not clear the cart when payment fails", async () => {
    verifyPayment.mockResolvedValue({ error: "Payment failed" });

    render(<SuccessPage />);

    await waitFor(() => {
      expect(verifyPayment).toHaveBeenCalledWith("test-session-id");
      expect(mockClearCart).not.toHaveBeenCalled();
    });

    expect(screen.getByText(/Payment failed/i)).toBeInTheDocument();
  });
});
