import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import ModifyProduct from "@/app/admin/products/modifyProduct/Modify";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

jest.mock("@storefront-ui/react", () => ({
  SfButton: ({ children, ...props }) => <button {...props}>{children}</button>,
  SfInput: (props) => <input {...props} />,
  SfSelect: ({ children, ...props }) => <select {...props}>{children}</select>,
  SfSwitch: ({ checked, onChange, ...props }) => (
    <input type="checkbox" checked={checked} onChange={onChange} {...props} />
  ),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    refresh: jest.fn(),
  })),
}));

jest.mock("@/app/lib/getCollections", () =>
  jest.fn(() =>
    Promise.resolve([
      { id: 1, name: "Sports" },
      { id: 2, name: "Fitness" },
    ])
  )
);
jest.mock("@/app/lib/getCategories", () =>
  jest.fn(() =>
    Promise.resolve([
      { id: 4, name: "Equipment" },
      { id: 5, name: "Accessories", parentCategory: { id: 4 } },
    ])
  )
);
jest.mock("@/app/lib/getColors", () =>
  jest.fn(() =>
    Promise.resolve([
      { id: 1, name: "Red" },
      { id: 2, name: "Blue" },
    ])
  )
);
jest.mock("@/app/lib/getSizes", () =>
  jest.fn(() =>
    Promise.resolve([
      { id: 1, name: "Small" },
      { id: 2, name: "Medium" },
    ])
  )
);
jest.mock("@/app/lib/updateProduct", () => jest.fn());

const mockProductData = {
  id: 1,
  name: "Basketball",
  description: "A cool black and gold B-ball",
  isActive: true,
  categoryId: 4,
  parentCategoryId: null,
  collectionId: 2,
  colors: [
    {
      id: 1,
      color: 1,
      mainImage: "main.jpg",
      images: "extra1.jpg,extra2.jpg",
      variants: [
        { id: 1, sizeId: 1, quantity: 10 },
        { id: 2, sizeId: 2, quantity: 5 },
      ],
    },
  ],
  prices: [
    {
      id: 1,
      price: 499950,
      isDiscount: false,
      startDate: "2024-01-01",
    },
  ],
};

describe("ModifyProduct Component", () => {
  test("renders correctly with initial data", async () => {
    await act(async () => {
      render(<ModifyProduct productData={mockProductData} />);
    });

    expect(screen.getByPlaceholderText(/Product name/i)).toHaveValue(
      "Basketball"
    );
    expect(screen.getByPlaceholderText(/Product description/i)).toHaveValue(
      "A cool black and gold B-ball"
    );

    await waitFor(() => {
      expect(screen.getByRole("combobox", { name: /Collection/i })).toHaveValue(
        "2"
      );
    });
  });

  test("displays validation errors when submitting an incomplete form", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(
      <ModifyProduct
        productData={{ ...mockProductData, name: "", description: "" }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Update Product/i }));

    fireEvent.click(screen.getByRole("button", { name: /Confirm/i }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        "Please fill all required fields."
      );
    });

    alertMock.mockRestore();
  });

  test("updates product details successfully", async () => {
    const mockUpdateProduct = require("@/app/lib/updateProduct");
    mockUpdateProduct.mockResolvedValueOnce({});

    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<ModifyProduct productData={mockProductData} />);

    const nameInput = screen.getByPlaceholderText(/Product name/i);
    fireEvent.change(nameInput, { target: { value: "Updated Basketball" } });

    fireEvent.click(screen.getByRole("button", { name: /Update Product/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Are you sure you want to update this product?")
      ).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole("button", { name: /Confirm/i }));

    await waitFor(() => {
      expect(mockUpdateProduct).toHaveBeenCalledWith(
        mockProductData,
        expect.objectContaining({
          name: "Updated Basketball",
        })
      );
    });

    expect(alertMock).toHaveBeenCalledWith("success");

    alertMock.mockRestore();
  });
});
