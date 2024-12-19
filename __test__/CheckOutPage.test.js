global.alert = jest.fn();
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CheckoutPage from "@/app/cart/checkout/page";
import { useCart } from "@/app/context/cartContext";
import cartSender from "@/app/lib/cartSender";
import fetchCustomer from "@/app/lib/fetchCustomer";
import { loadStripe } from "@stripe/stripe-js";
import "@testing-library/jest-dom";

jest.mock("@/app/lib/cartSender");
jest.mock("@/app/lib/fetchCustomer");
jest.mock("@stripe/stripe-js", () => ({
  loadStripe: jest.fn(),
}));
jest.mock("@/app/context/cartContext");

describe("CheckoutPage", () => {
  const mockCart = [
    { id: "1/15/25", quantity: 2, name: "Basketball", price: 49995 },
  ];
  const mockClearCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useCart.mockReturnValue({
      cart: mockCart,
      clearCart: mockClearCart,
    });
  });

  test("pre-fills the form with customer data", async () => {
    fetchCustomer.mockResolvedValue({
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      postalCode: "12345",
      phoneNumber: "1234567890",
      email: "john.doe@example.com",
    });

    render(<CheckoutPage />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("John")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
    });
  });

  test("handles checkout process successfully", async () => {
    cartSender.mockResolvedValue("sessionId123");
    const mockStripeRedirect = jest.fn();
    loadStripe.mockResolvedValue({
      redirectToCheckout: mockStripeRedirect,
    });

    render(<CheckoutPage />);

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "John" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /pay/i }));

    await waitFor(() => {
      expect(cartSender).toHaveBeenCalledWith(expect.any(Object), mockCart);
      expect(mockStripeRedirect).toHaveBeenCalledWith({
        sessionId: "sessionId123",
      });
    });
  });

  test("does not allow payment if required fields are empty", async () => {
    cartSender.mockResolvedValue("sessionId123");

    render(<CheckoutPage />);

    const payButton = screen.getByText("Pay");

    expect(payButton).not.toBeDisabled();

    fireEvent.click(payButton);

    expect(cartSender).not.toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "John" },
    });
    fireEvent.click(payButton);

    expect(cartSender).not.toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/delivery address/i), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByLabelText(/postal code/i), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john.doe@example.com" },
    });

    fireEvent.click(payButton);

    await waitFor(() => {
      expect(cartSender).toHaveBeenCalled();
    });
  });
});
