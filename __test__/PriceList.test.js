global.alert = jest.fn();

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PriceList from "@/app/components/admin/PriceList";
import "@testing-library/jest-dom";
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

describe("PriceList Component", () => {
  let initialPrices;
  let onPricesUpdateMock;

  beforeEach(() => {
    initialPrices = [
      {
        id: 1,
        price: 100,
        startDate: "2025-01-01",
        endDate: null,
        isDiscount: false,
      },
      {
        id: 2,
        price: 80,
        startDate: "2025-02-01",
        endDate: "2025-02-28",
        isDiscount: true,
      },
    ];
    onPricesUpdateMock = jest.fn();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders initial prices correctly", () => {
    render(
      <PriceList prices={initialPrices} onPricesUpdate={onPricesUpdateMock} />
    );

    const priceElements = screen.getAllByLabelText("Final Price");
    const startDateElements = screen.getAllByLabelText("Final Start Date");
    const endDateElements = screen.getAllByLabelText("Final End Date");

    expect(priceElements[0]).toHaveTextContent("Price: 100");
    expect(startDateElements[0]).toHaveTextContent("Start Date: 2025-01-01");
    expect(endDateElements[0]).toHaveTextContent("End Date: Ongoing");

    expect(priceElements[1]).toHaveTextContent("Price: 80");
    expect(startDateElements[1]).toHaveTextContent("Start Date: 2025-02-01");
    expect(endDateElements[1]).toHaveTextContent("End Date: 2025-02-28");
  });
  test("does not allow adding a price without Start Date or Price", async () => {
    render(
      <PriceList prices={initialPrices} onPricesUpdate={onPricesUpdateMock} />
    );

    fireEvent.click(screen.getByLabelText("Add Price Button"));
    fireEvent.click(screen.getByLabelText("Confirm Price"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Price and Start Date are required."
      );
    });
  });

  test("does not allow adding a discount with End Date before today", async () => {
    window.alert.mockClear();

    render(
      <PriceList prices={initialPrices} onPricesUpdate={onPricesUpdateMock} />
    );

    fireEvent.click(screen.getByLabelText("Add Price Button"));
    fireEvent.click(screen.getByLabelText("Discount Switch"));
    fireEvent.change(screen.getByLabelText("Add New Price"), {
      target: { value: 50 },
    });
    fireEvent.change(screen.getByLabelText("Start Date"), {
      target: { value: "2025-01-02" },
    });
    fireEvent.change(screen.getByLabelText("End Date"), {
      target: { value: "2023-12-31" },
    });
    fireEvent.click(screen.getByLabelText("Confirm Price"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "End Date cannot be before today."
      );
    });

    const alertCalls = window.alert.mock.calls.filter(
      ([msg]) => msg === "End Date cannot be before today."
    );
    console.log("Filtered alerts:", alertCalls);
    expect(alertCalls.length).toBe(1);
  });

  test("does not allow adding a non-discount price with overlapping dates", async () => {
    render(
      <PriceList prices={initialPrices} onPricesUpdate={onPricesUpdateMock} />
    );

    fireEvent.click(screen.getByLabelText("Add Price Button"));
    fireEvent.change(screen.getByLabelText("Add New Price"), {
      target: { value: 150 },
    });
    fireEvent.change(screen.getByLabelText("Start Date"), {
      target: { value: "2025-02-01" },
    });
    fireEvent.click(screen.getByLabelText("Confirm Price"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Non-discount price cannot overlap with any existing price."
      );
    });
  });

  test("does not allow adding a discount without an End Date", async () => {
    render(
      <PriceList prices={initialPrices} onPricesUpdate={onPricesUpdateMock} />
    );

    fireEvent.click(screen.getByLabelText("Add Price Button"));
    fireEvent.click(screen.getByLabelText("Discount Switch"));
    fireEvent.change(screen.getByLabelText("Add New Price"), {
      target: { value: 60 },
    });
    fireEvent.change(screen.getByLabelText("Start Date"), {
      target: { value: "2025-03-01" },
    });
    fireEvent.click(screen.getByLabelText("Confirm Price"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Discounts must have an End Date."
      );
    });
  });

  test("sets endDate of the current non-discount price when a new non-discount price is added", async () => {
    render(
      <PriceList prices={initialPrices} onPricesUpdate={onPricesUpdateMock} />
    );

    fireEvent.click(screen.getByLabelText("Add Price Button"));

    fireEvent.change(screen.getByLabelText("Add New Price"), {
      target: { value: 120 },
    });
    fireEvent.change(screen.getByLabelText("Start Date"), {
      target: { value: "2025-03-01" },
    });

    fireEvent.click(screen.getByLabelText("Confirm Price"));

    await waitFor(() => {
      expect(onPricesUpdateMock).toHaveBeenCalled();

      const updatedPrices = onPricesUpdateMock.mock.calls[0][0];

      expect(updatedPrices).toEqual([
        {
          id: 1,
          price: 100,
          startDate: "2025-01-01",
          endDate: "2025-02-28",
          isDiscount: false,
        },
        {
          id: 2,
          price: 80,
          startDate: "2025-02-01",
          endDate: "2025-02-28",
          isDiscount: true,
        },
        {
          id: 3,
          price: 120,
          startDate: "2025-03-01",
          endDate: null,
          isDiscount: false,
        },
      ]);
    });
  });

  test("does not allow overlapping discounts", async () => {
    render(
      <PriceList prices={initialPrices} onPricesUpdate={onPricesUpdateMock} />
    );

    fireEvent.click(screen.getByLabelText("Add Price Button"));
    fireEvent.click(screen.getByLabelText("Discount Switch"));
    fireEvent.change(screen.getByLabelText("Add New Price"), {
      target: { value: 70 },
    });
    fireEvent.change(screen.getByLabelText("Start Date"), {
      target: { value: "2025-02-15" },
    });
    fireEvent.change(screen.getByLabelText("End Date"), {
      target: { value: "2025-02-20" },
    });
    fireEvent.click(screen.getByLabelText("Confirm Price"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Discount start or end date cannot match any existing price dates."
      );
    });

    expect(onPricesUpdateMock).not.toHaveBeenCalled();
  });

  test("deletes a discount price correctly", async () => {
    render(
      <PriceList prices={initialPrices} onPricesUpdate={onPricesUpdateMock} />
    );

    fireEvent.click(screen.getByLabelText("Delete Price 2"));

    await waitFor(() => {
      expect(onPricesUpdateMock).toHaveBeenCalledWith([
        {
          id: 1,
          price: 100,
          startDate: "2025-01-01",
          endDate: null,
          isDiscount: false,
        },
      ]);
    });
  });

  test("deletes a non-discount price correctly", async () => {
    render(
      <PriceList prices={initialPrices} onPricesUpdate={onPricesUpdateMock} />
    );

    fireEvent.click(screen.getByLabelText("Delete Price 1"));

    await waitFor(() => {
      const updatedPrices = onPricesUpdateMock.mock.calls[0][0];
      expect(updatedPrices).toEqual([
        {
          id: 2,
          price: 80,
          startDate: "2025-02-01",
          endDate: "2025-02-28",
          isDiscount: true,
        },
      ]);
    });
  });

  test("removes the endDate of the previous non-discount price when the new non-discount price is deleted", async () => {
    const updatedInitialPrices = [
      {
        id: 1,
        price: 100,
        startDate: "2025-01-01",
        endDate: "2025-02-28",
        isDiscount: false,
      },
      {
        id: 2,
        price: 120,
        startDate: "2025-03-01",
        endDate: null,
        isDiscount: false,
      },
    ];

    render(
      <PriceList
        prices={updatedInitialPrices}
        onPricesUpdate={onPricesUpdateMock}
      />
    );

    fireEvent.click(screen.getByLabelText("Delete Price 2"));

    await waitFor(() => {
      expect(onPricesUpdateMock).toHaveBeenCalled();

      const updatedPrices = onPricesUpdateMock.mock.calls[0][0];

      expect(updatedPrices).toEqual([
        {
          id: 1,
          price: 100,
          startDate: "2025-01-01",
          endDate: null,
          isDiscount: false,
        },
      ]);
    });
  });
});
