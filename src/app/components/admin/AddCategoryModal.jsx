import React, { useState } from "react";
import addCategory from "@/app/lib/addCategory";
import sanitizeInput from "@/app/lib/sanitizeInput";
import { SfButton, SfInput, SfSelect, SfModal } from "@storefront-ui/react";

export default function AddCategoryModal({
  closeModal,
  onCategoryAdded,
  parentCategories,
}) {
  const [categoryName, setCategoryName] = useState("");
  const [selectedParentCategoryId, setSelectedParentCategoryId] =
    useState(null);

  const handleAddNewCategory = async () => {
    const sanitizedCategoryName = sanitizeInput(categoryName.trim()); 
    if (!sanitizedCategoryName) {
      alert("Category name cannot be empty or invalid.");
      return;
    }

    try {
      const newCategoryPayload = {
        name: sanitizedCategoryName,
        parentCategory: selectedParentCategoryId
          ? { id: selectedParentCategoryId } 
          : null,
      };

      const newCategory = await addCategory(newCategoryPayload); 
      onCategoryAdded(newCategory); 
      closeModal(); 
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add new category. Please try again.");
    }
  };

  return (
    <div
      className="bg-white p-4 rounded-md shadow-lg max-w-md mx-auto"
      style={{ width: "100%", maxWidth: "400px" }}
    >
      <h3 className="typography-headline-4 font-bold mb-4 text-center">
        Add New Category
      </h3>

      <SfInput
        value={categoryName}
        onChange={(e) => setCategoryName(sanitizeInput(e.target.value))} 
        placeholder="Enter category name"
        label="Category Name"
        wrapperClassName="mb-4"
      />

      <label className="typography-label-sm font-medium mb-2 block">
        Parent Category (Optional)
      </label>
      <SfSelect
        value={selectedParentCategoryId || ""}
        onChange={(e) =>
          setSelectedParentCategoryId(parseInt(e.target.value, 10))
        }
        wrapperClassName="mb-4"
      >
        <option value="">None</option>
        {parentCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </SfSelect>

      <div className="flex justify-end gap-4">
        <SfButton variant="secondary" type="button" onClick={closeModal}>
          Cancel
        </SfButton>
        <SfButton type="button" onClick={handleAddNewCategory}>
          Save Category
        </SfButton>
      </div>
    </div>
  );
}
