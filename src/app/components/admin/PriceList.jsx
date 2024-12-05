import React, { useState } from "react";
import { SfButton, SfInput, SfSwitch } from "@storefront-ui/react";

export default function PriceList({ prices: initialPrices, onPricesUpdate }) {
  const [prices, setPrices] = useState(initialPrices);
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPrice, setNewPrice] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [isDiscount, setIsDiscount] = useState(false);

  const currentDate = new Date();

  const handleAddPrice = () => {
    if (!newPrice || !newStartDate) {
      alert("Price and Start Date are required.");
      return;
    }

    const newStart = new Date(newStartDate);
    const newEnd = newEndDate ? new Date(newEndDate) : null;

    if (isDiscount && newEnd && newEnd <= newStart) {
      alert("End Date must be after the Start Date.");
      return;
    }

    if (
      prices.some((price) => {
        const priceStart = new Date(price.startDate);
        const priceEnd = price.endDate ? new Date(price.endDate) : null;

        return (
          newStart >= priceStart &&
          (priceEnd ? newStart <= priceEnd : newStart <= currentDate)
        );
      })
    ) {
      alert("Dates cannot overlap with existing prices.");
      return;
    }

    if (isDiscount && !newEndDate) {
      alert("Discounts must have an End Date.");
      return;
    }

    if (!isDiscount) {
      const currentNonDiscount = prices.find(
        (p) => !p.isDiscount && !p.endDate
      );
      if (currentNonDiscount) {
        currentNonDiscount.endDate = newStart.toISOString().split("T")[0];
      }
    }

    const newPriceEntry = {
      id: prices.length + 1,
      price: newPrice,
      startDate: newStartDate,
      endDate: newEndDate || null,
      isDiscount,
    };

    setPrices((prevPrices) => [...prevPrices, newPriceEntry]);
    setIsModalOpen(false);
    setNewPrice("");
    setNewStartDate("");
    setNewEndDate("");
    setIsDiscount(false);
    onPricesUpdate([...prices, newPriceEntry]);
  };

  const handleModifyClick = (price) => {
    setEditingPriceId(price.id);
    setNewPrice(price.price);
    setNewStartDate(price.startDate);
    setNewEndDate(price.endDate);
  };

  const handleSaveClick = (id) => {
    setPrices((prevPrices) =>
      prevPrices.map((price) =>
        price.id === id
          ? {
              ...price,
              price: newPrice,
              startDate: newStartDate,
              endDate: newEndDate,
            }
          : price
      )
    );
    setEditingPriceId(null);
    onPricesUpdate(prices);
  };

  const handleDeleteClick = (id) => {
    const priceToDelete = prices.find((p) => p.id === id);

    if (!priceToDelete) {
      console.error("Price not found");
      return;
    }

    let updatedPrices;

    if (priceToDelete.isDiscount) {
      updatedPrices = prices.filter((price) => price.id !== id);
    } else {
      const nonDiscountPrices = prices.filter((p) => !p.isDiscount);
      const remainingNonDiscount = nonDiscountPrices
        .filter((p) => p.id !== id)
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

      if (remainingNonDiscount.length > 0) {
        remainingNonDiscount[remainingNonDiscount.length - 1].endDate = null;
      }

      updatedPrices = prices.filter((price) => price.id !== id);
    }

    setPrices(updatedPrices);
    onPricesUpdate(updatedPrices);
  };
  const isNonEditablePrice = (price) => {
    const today = new Date();
    const startDate = new Date(price.startDate);
    const endDate = price.endDate ? new Date(price.endDate) : null;

    const isCurrentNonDiscount =
      !price.discount && startDate <= today && (!endDate || endDate >= today);

    const isHistoricalPrice = endDate && endDate < today;
    return isCurrentNonDiscount || isHistoricalPrice;
  };

  return (
    <div>
      <h1 className="mb-4 text-1xl font-bold">Prices</h1>

      {prices.map((price) => {
        const canModifyOrDelete = !isNonEditablePrice(price);

        return (
          <div
            key={price.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              gap: "1rem",
              borderBottom: "1px solid #ccc",
              paddingBottom: "1rem",
            }}
          >
            {editingPriceId === price.id ? (
              <>
                <SfInput
                  type="number"
                  label="Price"
                  value={newPrice ?? ""}
                  onChange={(e) => setNewPrice(parseFloat(e.target.value))}
                  placeholder="Price"
                />
                <SfInput
                  type="date"
                  label="Start Date"
                  value={newStartDate ?? ""}
                  onChange={(e) => setNewStartDate(e.target.value)}
                />
                <SfInput
                  type="date"
                  label="End Date"
                  value={newEndDate ?? ""}
                  onChange={(e) => setNewEndDate(e.target.value)}
                />
                <SfButton onClick={() => handleSaveClick(price.id)}>
                  Save
                </SfButton>
              </>
            ) : (
              <>
                <span>
                  <strong>Price:</strong> {price.price}
                </span>
                <span>
                  <strong>Start Date:</strong> {price.startDate}
                </span>
                <span>
                  <strong>End Date:</strong> {price.endDate || "Ongoing"}
                </span>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    justifyContent: "flex-start",
                  }}
                >
                  <SfButton
                    type="button"
                    style={{ flex: "1 1 auto", maxWidth: "100%" }}
                    disabled={!canModifyOrDelete}
                    onClick={() => handleModifyClick(price)}
                  >
                    Modify
                  </SfButton>
                  <SfButton
                    type="button"
                    style={{
                      flex: "1 1 auto",
                      maxWidth: "100%",
                      backgroundColor: "red",
                      color: "white",
                    }}
                    disabled={!canModifyOrDelete}
                    onClick={() => handleDeleteClick(price.id)}
                  >
                    Delete
                  </SfButton>
                </div>
              </>
            )}
          </div>
        );
      })}

      {/* Modal for adding a new price */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <SfButton
          type="button"
          onClick={() => setIsModalOpen(true)}
          style={{ marginBottom: "1rem" }}
        >
          Add Price
        </SfButton>
      </div>
      {isModalOpen && (
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            width: "fit-content",
            margin: "auto",
          }}
        >
          <h3 style={{ marginBottom: "1rem" }}>Add New Price</h3>
          <SfInput
            type="number"
            label="Price"
            value={newPrice}
            onChange={(e) => setNewPrice(parseFloat(e.target.value))}
            placeholder="Enter price"
            style={{ marginBottom: "1rem" }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <label
              htmlFor="isDiscountSwitch"
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                marginRight: "1rem",
              }}
            >
              Is Discount?
            </label>
            <SfSwitch
              id="isDiscountSwitch"
              checked={isDiscount}
              onChange={(e) => setIsDiscount(e.target.checked)}
            />
          </div>
          <SfInput
            type="date"
            label="Start Date"
            value={newStartDate}
            onChange={(e) => setNewStartDate(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />
          {isDiscount && (
            <SfInput
              type="date"
              label="End Date"
              value={newEndDate}
              onChange={(e) => setNewEndDate(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />
          )}
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
          >
            <SfButton type="button" onClick={handleAddPrice}>
              Add Price
            </SfButton>
            <SfButton type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </SfButton>
          </div>
        </div>
      )}
    </div>
  );
}
