import React, { useState } from "react";
import addCollection from "@/app/lib/addCollection";
import sanitizeInput from "@/app/lib/sanitizeInput"; // Import the sanitization function
import {
  SfButton,
  SfInput,
  SfSelect,
  SfSwitch,
  SfCheckbox,
  SfListItem,
  SfModal,
} from "@storefront-ui/react";

export default function AddCollectionModal({ closeModal, onCollectionAdded }) {
  const [collectionName, setCollectionName] = useState("");

  const handleAddNewCollection = async () => {
    const sanitizedCollectionName = sanitizeInput(collectionName.trim());
    if (!sanitizedCollectionName) {
      alert("Collection name cannot be empty.");
      return;
    }

    try {
      const newCollection = await addCollection({
        name: sanitizedCollectionName,
      });
      onCollectionAdded(newCollection);
      closeModal(); // Close the modal
    } catch (error) {
      console.error("Error adding collection:", error);
      alert("Failed to add new collection. Please try again.");
    }
  };

  return (
    <div
      className="bg-white p-4 rounded-md shadow-lg max-w-md mx-auto"
      style={{ width: "100%", maxWidth: "400px" }}
    >
      <h3 className="typography-headline-4 font-bold mb-4 text-center">
        Add New Collection
      </h3>

      <SfInput
        value={collectionName}
        onChange={(e) => setCollectionName(sanitizeInput(e.target.value))} // Sanitize input on change
        placeholder="Enter collection name"
        label="Collection Name"
        wrapperClassName="mb-4"
      />

      <div className="flex justify-end gap-4">
        <SfButton variant="secondary" type="button" onClick={closeModal}>
          Cancel
        </SfButton>
        <SfButton type="button" onClick={handleAddNewCollection}>
          Save Collection
        </SfButton>
      </div>
    </div>
  );
}
