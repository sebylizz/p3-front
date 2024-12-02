"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import uploadImages from '@/app/lib/uploadImages';
import updateProduct from '@/app/lib/updateProduct';
import removeImage from '@/app/lib/removeImage';
import AlertError from '@/app/components/errorAlert';
import AlertPositive from '@/app/components/okAlert';

export default function ModifyProduct({ productData }) {
  const router = useRouter();

  const [name, setName] = useState(productData.name || '');
  const [size, setSize] = useState(productData.size || '');
  const [price, setPrice] = useState(productData.price || 0);
  const [images, setImages] = useState(productData.image ? productData.image.split(",") : []);
  const [mainImage, setMainImage] = useState(productData.mainImage || null);
  const [quantity, setQuantity] = useState(productData.quantity || 0);
  const [newImages, setNewImages] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const id= productData.id;
  const initialMainImage = productData.mainImage || null;

  // Handle main image selection and replacement
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    setMainImage(file); // Replace with the new file
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prevImages) => [...prevImages, ...files]);
  };
  const handleDeleteImage = (imageToDelete) => {
    setNewImages((prevImages) =>
      prevImages.filter((image) => image !== imageToDelete)
    );
  };


  const handleRemoveImage = async (imageName) => {
    const updatedImages = images.filter((image) => image !== imageName);
    setImages(updatedImages);
    await removeImage(imageName, id,images, setImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || name.length < 3) {
      alert("Name must be at least 3 characters.");
      return;
    }
    if (!size) {
      alert("Size is required.");
      return;
    }
    if (isNaN(price) || price <= 0) {
      alert("Price must be a positive number.");
      return;
    }
    if (isNaN(quantity) || quantity <= 0) {
      alert("Quantity must be a positive integer.");
      return;
    }  
  
    if (images.length === 0 && newImages.length === 0) {
      alert("Please select images before submitting.");
      return;
    }
    if (!mainImage){
      alert("Please select main image before submitting.");
      return;

    }
    const mainImageName = mainImage instanceof File ? mainImage.name : mainImage;
    console.log(mainImageName);
    
    const uniqueImages= images.filter((image) => image.name !== mainImageName);
    const uniqueNewImages= newImages.filter((image)=>image.name !== mainImageName);
    console.log(uniqueNewImages);

    if (mainImage instanceof File && mainImage.name !== initialMainImage){
      const files =await uploadImages([mainImage], id);
    }
    if (uniqueNewImages.length>0){
      const files = await uploadImages(uniqueNewImages, id);
      var imagesString = files.join(",");
      
    }

    var imageFilenamesOld=uniqueImages.join(",");

    const imageFilenames = imageFilenamesOld && imagesString 
    ? `${imageFilenamesOld},${imagesString}` 
    : imageFilenamesOld || imagesString;

      const updatedProduct = {
      name,
      size,
      price: parseInt(price, 10),
      image: imageFilenames,
      mainImage: mainImage instanceof File ? mainImage.name : mainImage,
      quantity: parseInt(quantity, 10),
    };
    try {
      await updateProduct(productData, updatedProduct);
      setShowSuccessMessage(true);

      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error("Error updating product:", error);
      setShowErrorMessage(true);

      setTimeout(() => setShowErrorMessage(false), 3000);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 typography-headline-4 font-bold">Add Product</h1>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div>
          {/* Product Name */}
          <SfInput
            label="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="product name"
          />
        </div>
        <div>
          <label
            htmlFor="description-input"
            className="block text-sm font-medium mb-1"
          >
            <strong>Description</strong> 
          </label>
          <textarea
            id="description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
            rows="4"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* price */}
          {/* CLASS */}
          <label
            htmlFor="price-input"
            style={{ marginBottom: "0.5rem", fontWeight: "bold" }}
          >
            Price
          </label>
          <SfInput
            id="price-input"
            type="number"
            value={price || ""}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
            placeholder="Enter the price"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Start Date */}
          <label
            htmlFor="start-input"
            style={{ marginBottom: "0.5rem", fontWeight: "bold" }}
          >
            Start date
          </label>
          <SfInput
          id="start-input"
            label="Start Date"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            required
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Start Date */}
        <label
            htmlFor="end-input"
            style={{ marginBottom: "0.5rem", fontWeight: "bold" }}
          >
            End Date
          </label>
          <SfInput
          id="end-input"
            label="End Date"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            required
          />
        </div>

        {/* Active Switch */}
        <div className="flex justify-between items-center">
          <span className="typography-label-sm"><strong>Active</strong> </span>
          <SfSwitch
            checked={isActive}
            onChange={() => {
              if (!isStartDateInFuture()) {
                setIsActive(!isActive);
              }
            }}
            disabled={isStartDateInFuture()} // Disable if startDate is in the future
          />
        </div>
        {/* Collections */}
        <div>
          <SfSelect
            label="Collection"
            value={collectionId || ""}
            onChange={(e) => setCollectionId(e.target.value) || ""}
          >
            <option value=" ">Select a Collection</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </SfSelect>
          <SfButton //CLASS
            type="button"
            onClick={() => setIsAddCollectionModalOpen(true)}
            style={{
              display: "block",
              margin: "0.5rem auto",
            }}
          >
            Add New Collection
          </SfButton>

          {/* Modal for Adding New Collection */}
          {isAddCollectionModalOpen && (
            <AddCollectionModal
              closeModal={() => setIsAddCollectionModalOpen(false)}
              onCollectionAdded={handleCollectionAdded}
            />
          )}
        </div>

        <div>
          {/* Categories */}
          <SfSelect
            label="Parent Category"
            value={parentCategoryId || ""}
            onChange={(e) => {const selectedId = e.target.value; setParentCategoryId(e.target.value); console.log("Selected Category ID:", selectedId);}}
          >
            <option value="">Select a Parent Category</option>
            {categories
              .map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </SfSelect>

          <SfSelect
  label="Child Category"
  value={childCategoryId || ""}
  onChange={(e) => {
    const selectedId = parseInt(e.target.value, 10); // Ensure it's an integer
    setChildCategoryId(selectedId);
    console.log("Selected Child Category ID:", selectedId);
  }}
  disabled={!parentCategoryId} // Only enable if a parent category is selected
>
  <option value="">Select a Child Category</option>
  {categories
    .filter((category) => category.parentCategory?.id === parseInt(parentCategoryId, 10)) // Convert parentCategoryId to an integer
    .map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ))}
</SfSelect>

          <SfButton //CLASS
            type="button"
            onClick={() => setIsAddCategoryModalOpen(true)}
            style={{
              display: "block",
              margin: "0.5rem auto",
            }}
          >
            Add New Category
          </SfButton>
        </div>

        {isAddCategoryModalOpen && (
          <AddCategoryModal
            closeModal={() => setIsAddCategoryModalOpen(false)}
            onCategoryAdded={handleCategoryAdded}
            parentCategories={categories.filter(
              (category) => !category.parentCategory
            )} // Filter only parent categories
          />
        )}



        <div>
          {/* Dropdown and Buttons */}
          <div style={{ position: "relative", marginBottom: "1rem" }}>
            <SfSelect
              label="Choose Color"
              value={colorToAdd || ""}
              onChange={(e) => setColorToAdd(parseInt(e.target.value, 10))}
            >
              <option value="">Select a Color</option>
              {colors
                .filter(
                  (color) => !selectedColors.some((c) => c.colorId === color.id)
                )
                .map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                ))}
            </SfSelect>

            {/* Buttons Container */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginTop: "0.5rem",
                alignItems: "center", // Center the "Add Variant" button horizontally
              }}
            >
              {/* Add New Color Button */}
              <SfButton
                type="button"
                onClick={() => setIsAddColorModalOpen(true)}
                style={{ alignSelf: "flex-start" }} // Align to the left
              >
                Add New Color
              </SfButton>

              {/* Add Variant Button */}
              <SfButton
                type="button"
                onClick={handleAddColor}
                style={{ alignSelf: "center" }} // Center this button
              >
                Add Variant
              </SfButton>
            </div>
          </div>
        </div>

        {/* Modal for Adding New Color */}
        {isAddColorModalOpen && (
          <AddColorModal
            closeModal={() => setIsAddColorModalOpen(false)}
            onColorAdded={handleColorAdded}
          />
        )}

        {selectedColors.map((color, index) => (
          <div
            key={color.colorId}
            style={{
              marginTop: "20px",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
<h1 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{color.colorName}</h1>
  <div
    style={{
      display: "flex",
      justifyContent: "flex-end",
      gap: "5 rem",
    }}
  >
    {/* Expand/Collapse Button */}
    <SfButton
      type="button"
      onClick={() => handleToggleCollapse(color.colorId)}
      style={{
        backgroundColor: collapsedColors[color.colorId] ? "#007BFF" : "#6c757d",
        color: "white",
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        border: "none",
      }}
    >
      {collapsedColors[color.colorId] ? "Expand" : "Collapse"}
    </SfButton>

    {/* Delete Button */}
    <SfButton
      type="button"
      onClick={() => handleDeleteColor(color.colorId)}
      style={{
        backgroundColor: "red",
        color: "white",
        padding: "0.5rem 1rem",
        borderRadius: "4px",
      }}
    >
      Delete
    </SfButton>
  </div>
</div>


            {!collapsedColors[color.colorId] && (
              <>
                {/* Main Image */}
                <div>
                  <label>
                    Main Image:
                    <SfInput
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleMainImageChange(color.colorId, e)}
                    />
                  </label>
                  {color.mainImage && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "1rem",
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                    >
                      {color.mainImage && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <img
                            src={URL.createObjectURL(color.mainImage)}
                            alt="Main"
                            style={{
                              maxWidth: "150px",
                              height: "auto",
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                            }}
                          />
                          <SfButton
                            type="button"
                            onClick={() => handleMainImageDelete(color.colorId)}
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              borderColor: "red",
                              padding: "0.5rem 1rem",
                            }}
                          >
                            Delete
                          </SfButton>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* Extra Images */}
                <div>
                  <label>
                    Extra Images:
                    <SfInput
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) =>
                        handleExtraImagesChange(color.colorId, e)
                      }
                    />
                  </label>
                  {color.extraImages && color.extraImages.length > 0 && (
                    <div>
                      <h4>Extra Images:</h4>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          gap: "1rem",
                          margin: "1rem 0",
                        }}
                      >
                        {color.extraImages.map((image, index) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              maxWidth: "150px",
                              textAlign: "center",
                              height: "200px",
                              justifyContent: "space-between",
                            }}
                          >
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Extra ${index}`}
                              style={{
                                maxWidth: "100%",
                                maxHeight: "120px",
                                objectFit: "contain",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                              }}
                            />
                            <SfButton
                              type="button"
                              onClick={() =>
                                handleExtraImageDelete(color.colorId, image)
                              }
                              style={{
                                backgroundColor: "red",
                                color: "white",
                                borderColor: "red",
                                padding: "0.5rem 1rem",
                              }}
                            >
                              Delete
                            </SfButton>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3>Variants for {color.colorName}</h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Size and Quantity Inputs */}
                    <div
                      style={{ display: "flex", gap: "0.5rem", width: "100%" }}
                    >
                      <label style={{ flex: "1" }}>
                        Size:
                        <SfSelect
                          value={sizeToAdd || ""}
                          onChange={(e) =>
                            setSizeToAdd(parseInt(e.target.value, 10))
                          }
                        >
                          <option value="">Select a Size</option>
                          {sizes
                            .filter(
                              (size) =>
                                !color.variants.some(
                                  (v) => v.sizeId === size.id
                                )
                            )
                            .map((size) => (
                              <option key={size.id} value={size.id}>
                                {size.name}
                              </option>
                            ))}
                        </SfSelect>
                      </label>
                      <label style={{ flex: "1" }}>
                        Quantity:
                        <SfInput
                          type="number"
                          value={quantityToAdd}
                          onChange={(e) =>
                            setQuantityToAdd(parseInt(e.target.value, 10))
                          }
                          placeholder="Enter Quantity"
                        />
                      </label>
                    </div>

                    {/* Add New Size Button */}
                    <SfButton
                      type="button"
                      onClick={() => setIsAddSizeModalOpen(true)}
                      style={{ alignSelf: "flex-start" }}
                    >
                      Add New Size
                    </SfButton>

                    {/* Add Size and Quantity Button */}
                    <SfButton
                      type="button"
                      onClick={() => handleAddSizeAndQuantity(color.colorId)}
                      style={{ alignSelf: "center" }}
                    >
                      Add Size and Quantity
                    </SfButton>
                  </div>

                  {/* Modal for Adding New Size */}
                  {isAddSizeModalOpen && (
                    <AddSizeModal
                      closeModal={() => setIsAddSizeModalOpen(false)}
                      onSizeAdded={handleSizeAdded}
                    />
                  )}

                  {/* Variants List */}
                  <ul
                    style={{ listStyle: "none", padding: 0, margin: "1rem 0" }}
                  >
                    {color.variants.map((variant, vIndex) => (
                      <li
                        key={vIndex}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontSize: "1.2rem",
                          borderBottom: "1px solid #ccc",
                          padding: "0.5rem 0",
                        }}
                      >
                        <span>
                          {variant.sizeName}: {variant.quantity}
                        </span>
                        <SfButton
                          type="button"
                          onClick={() =>
                            handleDeleteVariant(color.colorId, vIndex)
                          }
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            borderColor: "red",
                            padding: "0.5rem 1rem",
                            marginLeft: "0.25rem",
                            marginRight: "0.25rem",
                          }}
                        >
                          Delete
                        </SfButton>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <SfButton
            type="submit"
            className="w-1/3 py-4 text-lg font-bold bg-green-600 hover:bg-green-700 text-white rounded-md"
          >
            Add Product
          </SfButton>
        </div>
      </form>
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={cancelSubmission}
        onConfirm={confirmSubmission}
        message="Are you sure you want to update this product?"
      />
    </div>
  );
}
