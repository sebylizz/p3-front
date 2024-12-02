"use client";

import React, { useState } from "react";
import colorFetcher from "@/app/lib/getColors";
import { useEffect } from "react";
import addColor from "@/app/lib/addColor";
import sizeFetcher from "@/app/lib/getSizes";
import addSize from "@/app/lib/addSizes";
// import collectionFetcher from "@/app/lib/getCollections";
import categoryFetcher from "@/app/lib/getCategories";
import addCategory from "@/app/lib/addCategory";
import addProduct from "@/app/lib/addProduct";

import AddCollectionModal from "@/app/components/admin/AddCollectionModal";
import AddCategoryModal from "@/app/components/admin/AddCategoryModal";
import AddSizeModal from "@/app/components/admin/AddSizeModal";
import ColorSection from "@/app/components/admin/AddColorModal";
import VariantSection from "@/app/components/admin/VariantSection";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [collectionId, setCollectionId] = useState(null);
  const [price, setPrice] = useState(0);
  const [isDiscount, setIsDiscount] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  const [selectedColors, setSelectedColors] = useState([]);
  const [colorToAdd, setColorToAdd] = useState(null);

  const [isAddColorModalOpen, setIsAddColorModalOpen] = useState(false);
  const [newColorName, setNewColorName] = useState("");


  const [sizeToAdd, setSizeToAdd] = useState(null);
  const [quantityToAdd, setQuantityToAdd] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [extraImages, setExtraImages] = useState([]);

  const [isAddSizeModalOpen, setIsAddSizeModalOpen] = useState(false);
  const [newSizeName, setNewSizeName] = useState("");

  //collection
  const [isAddCollectionModalOpen, setIsAddCollectionModalOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  
  //categories
  const [parentCategoryId, setParentCategoryId] = useState(null);
  const [childCategoryId, setChildCategoryId] = useState(null);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  
  //colorsection
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

 useEffect(() => {
  const fetchData = async () => {
    try {
      const fetchedColors = await colorFetcher();
      setColors(fetchedColors);

      const fetchedSizes = await sizeFetcher();
      setSizes(fetchedSizes);

      const fetchedCollections = await collectionFetcher();
      setCollections(fetchedCollections);

      const fetchedCategories = await categoryFetcher();
      setCategories(fetchedCategories);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
}, []);

const handleCollectionAdded = (newCollection) => {
  setCollections((prevCollections) => [...prevCollections, newCollection]);
};

const handleCategoryAdded = (newCategory) => {
  setCategories((prevCategories) => [...prevCategories, newCategory]);
};

const handleColorUpdated = (colorId, updatedData) => {
  setSelectedColors((prevColors) =>
    prevColors.map((color) =>
      color.colorId === colorId ? { ...color, ...updatedData } : color
    )
  );
};

const handleVariantAdded = (colorId, variant) => {
  setColors((prevColors) =>
    prevColors.map((color) =>
      color.colorId === colorId
        ? { ...color, variants: [...color.variants, variant] }
        : color
    )
  );
};

const handleVariantDeleted = (colorId, sizeId) => {
  setColors((prevColors) =>
    prevColors.map((color) =>
      color.colorId === colorId
        ? {
            ...color,
            variants: color.variants.filter((variant) => variant.sizeId !== sizeId),
          }
        : color
    )
  );
};

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!startDate) {
      alert("Start Date is required.");
      return;
    }
  
    if (isDiscount && !endDate) {
      alert("End Date is required for discounts.");
      return;
    }
    // Construct the product data for the backend
    const productData = {
      name,
      description,
      isActive,
      collectionId,
      categoryId: childCategoryId || parentCategoryId, // Use childCategoryId if selected, else parentCategoryId
      price: {
        price,
        isDiscount,
        startDate,
        endDate: isDiscount ? endDate : null, // Include endDate only if discount is applied
      },
      colors: selectedColors.map((color) => ({
        colorId: color.colorId, // ID of the selected color
        mainImage: color.mainImage ? color.mainImage.name : null, // Use the name of the main image
        images: color.extraImages ? color.extraImages.map((img) => img.name).join(",") : "", // Join extra image names with commas,
      })),
      variants: selectedColors.flatMap((color) =>
        color.variants.map((variant) => ({
          colorId: color.colorId, // Match this to the ProductColor for this variant
          sizeId: variant.sizeId, // ID of the size for this variant
          quantity: variant.quantity, // Quantity for this color-size combination
        }))
      ),
    };
  
    console.log("Product Data:", productData);
  
    // Send productData to the backend

    try {
      const response = await addProduct(productData);
      if (!response.id) throw new Error("Failed to add product");
      for (const color of selectedColors) {
        const images = [color.mainImage, ...color.extraImages]; 
        await uploadImages(images, productId, color.colorId);
      }
      
    } catch (error) {
      console.error("Error adding product:", error);
      alert(`Error adding product: ${error.message}`);
      
    }
    
  };
  

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
        </div>
        {/* Collections */}
        <div>
          <label>
            Collection:
            <select
              value={collectionId || ""}
              onChange={(e) => setCollectionId(parseInt(e.target.value, 10))}
              required
            >
              <option value="">Select a Collection</option>
              {collections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => setIsAddCollectionModalOpen(true)}>
              Add New Collection
            </button>
          </label>
        </div>

        {/* Modal for Adding New Collection */}
        {isAddCollectionModalOpen && (
           <AddCollectionModal
          closeModal={() => setIsAddCollectionModalOpen(false)}
          onCollectionAdded={handleCollectionAdded}
        />
        )}

<div>
  <label>
    Parent Category:
    <select
      value={parentCategoryId || ""}
      onChange={(e) => {
        const selectedId = parseInt(e.target.value, 10);
        setParentCategoryId(selectedId);
        console.log("Selected Parent Category ID:", selectedId);
      }}
    >
      <option value="">Select a Parent Category</option>
      {categories
        .filter((category) => category.parentCategory === null) // Only parent categories
        .map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
    </select>
  </label>
</div>

<div>
  <label>
    Child Category:
    <select
      value={childCategoryId || ""}
      onChange={(e) => {
        const selectedId = parseInt(e.target.value, 10);
        setChildCategoryId(selectedId);
        console.log("Selected Child Category ID:", selectedId);
      }}
      disabled={!parentCategoryId} // Only enable if a parent category is selected
    >
      <option value="">Select a Child Category</option>
      {categories
        .filter((category) => category.parentCategory?.id === parentCategoryId) // Match parentCategory.id
        .map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
    </select>
  </label>
</div>

<button onClick={() => setIsAddCategoryModalOpen(true)}>Add New Category</button>
{isAddCategoryModalOpen && (
  <AddCategoryModal
    closeModal={() => setIsAddCategoryModalOpen(false)}
    onCategoryAdded={handleCategoryAdded}
    parentCategories={categories.filter((category) => !category.parentCategory)} // Filter only parent categories
  />
)}


        <div>
          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              step="0.01"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
        </div>

        {/* ColorSection */}
        <div>
      <h1>Add Product</h1>
      <ColorSection colors={colors} onColorUpdated={handleColorUpdated} />
      <VariantSection
        colors={colors}
        sizes={sizes}
        onVariantAdded={handleVariantAdded}
        onVariantDeleted={handleVariantDeleted}
      />
    </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
