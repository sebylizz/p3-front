import React, { useState } from "react";
import addSize from "@/app/lib/addSizes";
import sanitizeInput from "@/app/lib/sanitizeInput";
import { SfButton } from "@storefront-ui/react";

export default function AddSizeModal({ closeModal, onSizeAdded }) {
  const [sizeName, setSizeName] = useState("");

  const handleAddSize = async () => {
    const sanitizedSizeName = sanitizeInput(sizeName.trim());

    if (!sanitizedSizeName) {
      alert("Size name cannot be empty or invalid.");
      return;
    }

    try {
      const newSize = await addSize({ name: sanitizedSizeName });
      onSizeAdded(newSize);
      closeModal();
    } catch (error) {
      console.error("Error adding size:", error);
      alert("Failed to add size.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-sm">
        {/* Modal Header */}
        <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
          Add New Size
        </h3>

        {/* Size Name Input */}
        <div className="mb-4">
          <label htmlFor="sizeName" className="block text-sm font-medium text-gray-700 mb-1">
            Size Name
          </label>
          <input
            id="sizeName"
            type="text"
            value={sizeName}
            onChange={(e) => setSizeName(sanitizeInput(e.target.value))}
            placeholder="Enter size name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-4">
          <SfButton
          variant="secondary" 
            type="button"
            onClick={closeModal}
          >
            Cancel
          </SfButton>
          <SfButton
            type="button"
            onClick={handleAddSize}
          >
            Add Size
          </SfButton>
        </div>
      </div>
    </div>
  );
}
