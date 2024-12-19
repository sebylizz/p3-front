export function handleAddSizeAndQuantity({
    colorId,
    sizeToAdd,
    quantityToAdd,
    setSizeToAdd,
    setQuantityToAdd,
    selectedColors,
    setSelectedColors,
    sizes,
  }) {
    if (!sizeToAdd || !quantityToAdd || quantityToAdd <= 0) {
      alert("Please select a size and enter a valid quantity.");
      return;
    }
  
    setSelectedColors((prevColors) =>
      prevColors.map((color) =>
        color.colorId === colorId
          ? {
              ...color,
              variants: [
                ...color.variants,
                {
                  sizeId: sizeToAdd,
                  sizeName: sizes.find((s) => s.id === sizeToAdd)?.name || "",
                  quantity: parseInt(quantityToAdd, 10),
                },
              ],
            }
          : color
      )
    );
  
    setSizeToAdd(null);
    setQuantityToAdd("");
  }
  