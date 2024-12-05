"use client";

import { useState, useEffect, useRef } from "react";
import {
  SfButton,
  SfInput,
  SfSelect,
  SfSwitch,
  SfCheckbox,
  SfListItem,
  SfModal,
} from "@storefront-ui/react";

import colorFetcher from "@/app/lib/getColors";
import sizeFetcher from "@/app/lib/getSizes";
import categoryFetcher from "@/app/lib/getCategories";
import addProduct from "@/app/lib/addProduct";
import collectionFetcher from "@/app/lib/getCollections";

import AddCollectionModal from "@/app/components/admin/AddCollectionModal";
import AddCategoryModal from "@/app/components/admin/AddCategoryModal";
import AddColorModal from "@/app/components/admin/AddColorModal";
import AddSizeModal from "@/app/components/admin/AddSizeModal";

import uploadImages from "@/app/lib/uploadImages";

import ConfirmationModal from "@/app/components/admin/ConfirmationModal";

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

  const [sizes, setSizes] = useState([]);
  const [sizeToAdd, setSizeToAdd] = useState(null);
  const [quantityToAdd, setQuantityToAdd] = useState("");

  const [mainImage, setMainImage] = useState(null);
  const [extraImages, setExtraImages] = useState([]);

  //collection
  const [isAddCollectionModalOpen, setIsAddCollectionModalOpen] =
    useState(false);
  const [collections, setCollections] = useState([]);

  //categories
  const [parentCategoryId, setParentCategoryId] = useState(null);
  const [childCategoryId, setChildCategoryId] = useState(null);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  //variant
  const [isAddColorModalOpen, setIsAddColorModalOpen] = useState(false);
  const [isAddSizeModalOpen, setIsAddSizeModalOpen] = useState(false);

  const [collapsedColors, setCollapsedColors] = useState({});

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [productData, setProductData] = useState(null);

  const [status, setStatus] = useState(null);
  const handleDeleteVariant = (colorId, variantIndex) => {
    setSelectedColors((prevColors) =>
      prevColors.map((color) =>
        color.colorId === colorId
          ? {
              ...color,
              variants: color.variants.filter(
                (_, index) => index !== variantIndex
              ),
            }
          : color
      )
    );
  };
  useEffect(() => {
    router.refresh();
  }, [router]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [
          fetchedColors,
          fetchedSizes,
          fetchedCollections,
          fetchedCategories,
        ] = await Promise.all([
          colorFetcher(),
          sizeFetcher(),
          collectionFetcher(),
          categoryFetcher(),
        ]);

        setColors(fetchedColors);
        setSizes(fetchedSizes);
        setCollections(fetchedCollections);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInitialData();
  }, []);

  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);
    setIsActive(!isStartDateInFuture(date));
  };

  const isStartDateInFuture = () => {
    const today = new Date();
    const selectedDate = new Date(startDate);
    return selectedDate > today;
  };

  const handleToggleCollapse = (colorId) => {
    setCollapsedColors((prev) => ({
      ...prev,
      [colorId]: !prev[colorId],
    }));
  };

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
  };

  const handleMainImageChange = (colorId, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedColors((prevColors) =>
      prevColors.map((color) =>
        color.colorId === colorId ? { ...color, mainImage: file } : color
      )
    );
  };

  const handleMainImageDelete = (colorId) => {
    setSelectedColors((prevColors) =>
      prevColors.map((color) =>
        color.colorId === colorId ? { ...color, mainImage: null } : color
      )
    );
  };

  const handleExtraImagesChange = (colorId, e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setSelectedColors((prevColors) =>
      prevColors.map((color) =>
        color.colorId === colorId
          ? { ...color, extraImages: [...(color.extraImages || []), ...files] }
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
              ),
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!startDate) {
      alert("Start Date is required.");
      return;
    }

    const data = {
      name,
      description,
      isActive: !isStartDateInFuture,
      collectionId,
      categoryId: childCategoryId || parentCategoryId,
      prices: [
        {
          price: price * 1000,
          isDiscount: false,
          startDate,
          endDate: null,
        },
      ],
      colors: selectedColors.map((color) => ({
        color: color.colorId,
        mainImage: color.mainImage ? color.mainImage.name : null,
        images: color.extraImages
          ? color.extraImages.map((img) => img.name).join(",")
          : "",
        variants: color.variants.map((variant) => ({
          sizeId: variant.sizeId,
          quantity: variant.quantity,
        })),
      })),
    };
    setProductData(data);
    setIsConfirmationModalOpen(true);
  };

  const confirmSubmission = async (e) => {
    e.preventDefault();
    setStatus(null);
    setIsConfirmationModalOpen(false);
    try {
      const { productId, colorIds } = await addProduct(productData);

      for (let i = 0; i < selectedColors.length; i++) {
        const color = selectedColors[i];
        const colorId = colorIds[i];
        const images = [color.mainImage, ...color.extraImages];
        await uploadImages(images, productId, colorId);
      }
      setStatus("success");
      resetFields();
    } catch (error) {
      console.error("Error adding product:", error);
      alert(`Error adding product: ${error.message}`);
      setStatus("failure");
    }
  };

  const cancelSubmission = () => {
    setIsConfirmationModalOpen(false);
    setStatus(null);
  };
  const handleDeleteColor = (colorId) => {
    setSelectedColors((prevColors) =>
      prevColors.filter((color) => color.colorId !== colorId)
    );
  };

  const resetFields = () => {
    setName("");
    setDescription("");
    setIsActive(true);
    setCollectionId(null);
    setPrice(0);
    setStartDate("");
    setSelectedColors([]);
    setColorToAdd(null);
    setSizeToAdd(null);
    setQuantityToAdd("");
    setMainImage(null);
    setExtraImages([]);
    setParentCategoryId(null);
    setChildCategoryId(null);
    setCollapsedColors({});
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

        {/* Active Switch */}
        <div className="flex justify-between items-center">
          <span className="typography-label-sm">
            <strong>Active</strong>{" "}
          </span>
          <SfSwitch
            checked={isActive}
            onChange={() => {
              if (!isStartDateInFuture()) {
                setIsActive(!isActive);
              }
            }}
            disabled={isStartDateInFuture()}
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
          <SfButton
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
            onChange={(e) => {
              const selectedId = e.target.value;
              setParentCategoryId(e.target.value);
            }}
          >
            <option value="">Select a Parent Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </SfSelect>

          <SfSelect
            label="Child Category"
            value={childCategoryId || ""}
            onChange={(e) => {
              const selectedId = parseInt(e.target.value, 10);
              setChildCategoryId(selectedId);
            }}
            disabled={!parentCategoryId}
          >
            <option value="">Select a Child Category</option>
            {categories
              .filter(
                (category) =>
                  category.parentCategory?.id === parseInt(parentCategoryId, 10)
              )
              .map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </SfSelect>

          <SfButton
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
            )}
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
                alignItems: "center",
              }}
            >
              {/* Add New Color Button */}
              <SfButton
                type="button"
                onClick={() => setIsAddColorModalOpen(true)}
                style={{ alignSelf: "flex-start" }}
              >
                Add New Color
              </SfButton>

              {/* Add Variant Button */}
              <SfButton
                type="button"
                onClick={handleAddColor}
                style={{ alignSelf: "center" }}
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
              <h1 style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                {color.colorName}
              </h1>
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
                    backgroundColor: collapsedColors[color.colorId]
                      ? "#007BFF"
                      : "#6c757d",
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
        message="Are you sure you want to add this product?"
        status={status}
      />
    </div>
  );
}
