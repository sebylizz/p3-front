"use client";

import React, { useState } from "react";
import { useEffect } from "react";

import colorFetcher from "@/app/lib/getColors";
import sizeFetcher from "@/app/lib/getSizes";
// import collectionFetcher from "@/app/lib/getCollections";
import categoryFetcher from "@/app/lib/getCategories";
import addProduct from "@/app/lib/addProduct";

import AddCollectionModal from "@/app/components/admin/AddCollectionModal";
import AddCategoryModal from "@/app/components/admin/AddCategoryModal";
import AddColorModal from "@/app/components/admin/AddColorModal";
import AddSizeModal from "@/app/components/admin/AddSizeModal";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [collectionId, setCollectionId] = useState(null);
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState("");

  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [colorToAdd, setColorToAdd] = useState(null);

  const [sizes, setSizes]=useState([]);
  const [sizeToAdd, setSizeToAdd] = useState(null);
  const [quantityToAdd, setQuantityToAdd] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [extraImages, setExtraImages] = useState([]);


  //collection
  const [isAddCollectionModalOpen, setIsAddCollectionModalOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  
  //categories
  const [parentCategoryId, setParentCategoryId] = useState(null);
  const [childCategoryId, setChildCategoryId] = useState(null);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  //variant
  const [isAddColorModalOpen, setIsAddColorModalOpen] = useState(false);
  const [isAddSizeModalOpen, setIsAddSizeModalOpen] = useState(false);
  

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

const handleColorAdded = (newColor) => {
  setColors((prevColors) => [...prevColors, newColor]);
};

const handleSizeAdded = (newSize) => {
  setSizes((prevSizes) => [...prevSizes, newSize]);
};


  const handleAddColor = () => {
    if (!colorToAdd) {
      alert("Please select a color to add.");
      return;
    }

    const colorAlreadyAdded = selectedColors.some((color) => color.colorId === colorToAdd);
    if (colorAlreadyAdded) {
      alert("Color is already added.");
      return;
    }

    const selectedColorDetails = colors.find((color) => color.id === colorToAdd);

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

    // Reset inputs
    setColorToAdd(null);
  };

  const handleMainImageChange = (colorId, e) => {
    const file = e.target.files[0]; // Get the selected file
    if (!file) return;
  
    setSelectedColors((prevColors) =>
      prevColors.map((color) =>
        color.colorId === colorId
          ? { ...color, mainImage: file } // Update the main image for the specific color
          : color
      )
    );
  };
  
  const handleMainImageDelete = (colorId) => {
    setSelectedColors((prevColors) =>
      prevColors.map((color) =>
        color.colorId === colorId
          ? { ...color, mainImage: null } // Remove the main image for the specific color
          : color
      )
    );
  };
  
  const handleExtraImagesChange = (colorId, e) => {
    const files = Array.from(e.target.files); // Get the selected files
    if (files.length === 0) return;
  
    setSelectedColors((prevColors) =>
      prevColors.map((color) =>
        color.colorId === colorId
          ? { ...color, extraImages: [...(color.extraImages || []), ...files] } // Append new files to existing extra images
          : color
      )
    );
  };
  
  const handleExtraImageDelete = (colorId, imageToDelete) => {
    setSelectedColors((prevColors) =>
      prevColors.map((color) =>
        color.colorId === colorId
          ? {
              ...color,
              extraImages: (color.extraImages || []).filter(
                (image) => image !== imageToDelete
              ), // Remove the selected extra image
            }
          : color
      )
    );
  };
  
  const handleAddSizeAndQuantity = (colorId) => {
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
                  sizeName: sizes.find((s) => s.id === sizeToAdd).name,
                  quantity: parseInt(quantityToAdd, 10),
                },
              ],
            }
          : color
      )
    );

    setSizeToAdd(null);
    setQuantityToAdd("");
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

        {/* Colors */}
        <div>
          <label>
            Choose Color:
            <select
              value={colorToAdd || ""}
              onChange={(e) => setColorToAdd(parseInt(e.target.value, 10))}
            >
              <option value="">Select a Color</option>
              {colors
                .filter((color) => !selectedColors.some((c) => c.colorId === color.id))
                .map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                ))}
            </select>
            <button type="button" onClick={handleAddColor}>
              Add Color
            </button>
            <button type="button" onClick={() => setIsAddColorModalOpen(true)}>
              Add New Color
            </button>
          </label>
        </div>

        {/* Modal for Adding New Color */}
        {isAddColorModalOpen && (
        <AddColorModal
          closeModal={() => setIsAddColorModalOpen(false)}
          onColorAdded={handleColorAdded}
        />
      )}
        
        {selectedColors.map((color, index) => (
          <div key={color.colorId} style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h3>Images for {color.colorName}</h3>
      
          {/* Main Image */}
          <div>
            <label>
              Main Image:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleMainImageChange(color.colorId, e)}
              />
            </label>
            {color.mainImage && (
              <div>
                <p>Main Image: {color.mainImage.name}</p>
                <button onClick={() => handleMainImageDelete(color.colorId)}>Delete Main Image</button>
              </div>
            )}
          </div>
      
          {/* Extra Images */}
          <div>
            <label>
              Extra Images:
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleExtraImagesChange(color.colorId, e)}
              />
            </label>
            {color.extraImages && color.extraImages.length > 0 && (
              <div>
                <h4>Extra Images:</h4>
                <ul>
                  {color.extraImages.map((image, index) => (
                    <li key={index}>
                      {image.name}
                      <button onClick={() => handleExtraImageDelete(color.colorId, image)}>
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <h3>Variants for {color.colorName}</h3>
            <div>
              <label>
                Size:
                <select
                  value={sizeToAdd || ""}
                  onChange={(e) => setSizeToAdd(parseInt(e.target.value, 10))}
                >
                  <option value="">Select a Size</option>
                  {sizes
                    .filter((size) => !color.variants.some((v) => v.sizeId === size.id))
                    .map((size) => (
                      <option key={size.id} value={size.id}>
                        {size.name}
                      </option>
                    ))}
                </select>
                <button type="button" onClick={() => setIsAddSizeModalOpen(true)}>
                  Add New Size
                </button>
              </label>
              {/* Modal for Adding New Size */}
              {isAddSizeModalOpen && (
        <AddSizeModal
          closeModal={() => setIsAddSizeModalOpen(false)}
          onSizeAdded={handleSizeAdded}
        />
      )}
              <label>
                Quantity:
                <input
                  type="number"
                  value={quantityToAdd}
                  onChange={(e) => setQuantityToAdd(parseInt(e.target.value, 10))}
                />
              </label>
              <button
                type="button"
                onClick={() => handleAddSizeAndQuantity(color.colorId)}
              >
                Add Size and Quantity
              </button>
            </div>
            <ul>
              {color.variants.map((variant, vIndex) => (
                <li key={vIndex}>
                  {variant.sizeName}: {variant.quantity}
                </li>
              ))}
            </ul>
          </div>
          </div>
        ))}
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
