import React, { useState } from "react";
import addColor from "@/app/lib/addColor";
import sanitizeInput from "@/app/lib/sanitizeInput";
import {
  SfButton,
  SfInput,
  SfSelect,
  SfSwitch,
  SfCheckbox,
  SfListItem,
  SfModal,
} from "@storefront-ui/react";

export default function AddColorModal({ closeModal, onColorAdded }) {
  const [colorName, setColorName] = useState("");

  const handleAddColor = async () => {
    const sanitizedColorName = sanitizeInput(colorName.trim());

    if (!sanitizedColorName) {
      alert("Color name cannot be empty or invalid.");
      return;
    }

    try {
      const newColor = await addColor({ name: sanitizedColorName });
      onColorAdded(newColor);
      closeModal();
    } catch (error) {
      console.error("Error adding color:", error);
      alert("Failed to add color.");
    }
  };

  return (
    <div
      className="bg-white p-4 rounded-md shadow-lg max-w-md mx-auto"
      style={{ width: "100%", maxWidth: "400px" }}
    >
      <h3 className="typography-headline-4 font-bold mb-4 text-center">
        Add New Color
      </h3>

      <SfInput
        value={colorName}
        onChange={(e) => setColorName(sanitizeInput(e.target.value))}
        placeholder="Enter color name"
        label="Color Name"
        wrapperClassName="mb-4"
      />

      <div className="flex justify-end gap-4">
        <SfButton variant="secondary" type="button" onClick={closeModal}>
          Cancel
        </SfButton>
        <SfButton type="button" onClick={handleAddColor}>
          Add Color
        </SfButton>
      </div>
    </div>
  );
}
