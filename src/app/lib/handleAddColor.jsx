export function handleAddColor({
    colorToAdd,
    setColorToAdd,
    selectedColors,
    setSelectedColors,
    colors,
  }) {
    if (!colorToAdd) {
      alert("Please select a color to add.");
      return;
    }
  
    const colorAlreadyAdded = selectedColors.some(
      (color) => color.colorId === colorToAdd
    );
    if (colorAlreadyAdded) {
      alert("Color is already added.");
      return;
    }
  
    const selectedColorDetails = colors.find(
      (color) => color.id === colorToAdd
    );
  
    setSelectedColors((prevColors) => [
      ...prevColors,
      {
        colorId: selectedColorDetails.id,
        colorName: selectedColorDetails.name,
        mainImage: null,
        extraImages: [],
        variants: [],
      },
    ]);
  
    setColorToAdd(null);
  }
  