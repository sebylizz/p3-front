"use client";

import React, { useState, useEffect } from "react";
import {
  SfButton,
  SfInput,
  SfSelect,
  SfSwitch,
  SfModal,
} from "@storefront-ui/react";
import colorFetcher from "@/app/lib/getColors";
import sizeFetcher from "@/app/lib/getSizes";
import categoryFetcher from "@/app/lib/getCategories";
import collectionFetcher from "@/app/lib/getCollections";
import uploadImages from "@/app/lib/uploadImages";
import updateProduct from "@/app/lib/updateProduct";
import AddCollectionModal from "@/app/components/admin/AddCollectionModal";
import AddCategoryModal from "@/app/components/admin/AddCategoryModal";
import AddColorModal from "@/app/components/admin/AddColorModal";
import ConfirmationModal from "@/app/components/admin/ConfirmationModal";
import AddSizeModal from "@/app/components/admin/AddSizeModal";
import PriceList from "@/app/components/admin/PriceList";
import deleteFiles from "@/app/lib/deleteFile";
import { useRouter } from "next/navigation";
import truncateToTwoDecimals from "@/app/lib/truncateToTwoDecimals";

export default function ModifyProduct({ productData }) {
  const router = useRouter();
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );

  const [isActive, setIsActive] = useState(productData?.isActive || false);

  const [collectionId, setCollectionId] = useState(
    productData?.collectionId || null
  );

  //categories
  const [parentCategoryId, setParentCategoryId] = useState(null);
  const [childCategoryId, setChildCategoryId] = useState(null);

  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [colorToAdd, setColorToAdd] = useState(null);

  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddCollectionModalOpen, setIsAddCollectionModalOpen] =
    useState(false);
  const [isAddColorModalOpen, setIsAddColorModalOpen] = useState(false);
  const [errors, setErrors] = useState({}); // Track errors

  const validateForm = () => {
    const validationErrors = {};

    // Check required fields
    if (!name.trim()) validationErrors.name = "Product name is required.";
    if (!description.trim()) validationErrors.description = "Description is required.";
    if (!parentCategoryId) validationErrors.parentCategoryId = "Parent category is required.";
    if (selectedColors.length === 0) validationErrors.colors = "At least one color must be added.";
    if (prices.length === 0) validationErrors.prices = "At least one price must be set.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; // Return true if no errors
  };

  const [prices, setPrices] = useState(
    productData?.prices?.map((price) => ({
      ...price,
      price: truncateToTwoDecimals(price.price / 1000),
    })) || []
  );

  const [initialPrices, setInitialPrices] = useState(
    productData?.prices?.map((price) => ({
      ...price,
      price: truncateToTwoDecimals(price.price / 1000),
    })) || []
  );
  const [startDate, setStartDate] = useState("");

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [status, setStatus] = useState(null);

  const [sizes, setSizes] = useState([]);

  const [collapsedColors, setCollapsedColors] = useState(() => {
    if (productData?.colors) {
      return productData.colors.reduce((acc, color) => {
        return {
          ...acc,
          [color.color]: true,
        };
      }, {});
    }
    return {};
  });

  const [sizeToAdd, setSizeToAdd] = useState(null);
  const [quantityToAdd, setQuantityToAdd] = useState("");
  const [isAddSizeModalOpen, setIsAddSizeModalOpen] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);



  const isDuplicateImage = (mainImage, extraImages, image) => {
    const mainImageName =
      mainImage instanceof File ? mainImage.name : mainImage;
    const imageName = image instanceof File ? image.name : image;

    return (
      mainImageName === imageName ||
      extraImages.some((img) => {
        const extraImageName = img instanceof File ? img.name : img;
        return extraImageName === imageName;
      })
    );
  };



  const handleColorAdded = (newColor) => {
    setColors((prevColors) => [...prevColors, newColor]);
  };

  const handleSizeAdded = (newSize) => {
    setSizes((prevSizes) => [...prevSizes, newSize]);
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
    const color = selectedColors.find((color) => color.colorId === colorId);
    if (color?.mainImage && typeof color.mainImage === "string") {
      setDeletedImages((prev) => [
        ...prev,
        {
          productId: productData.id,
          colorId: color.id,
          filename: color.mainImage,
        },
      ]);
    }
  };

  const handleExtraImagesChange = (colorId, e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setSelectedColors((prevColors) =>
      prevColors.map((color) =>
        color.colorId === colorId
          ? {
              ...color,
              extraImages: [
                ...(color.extraImages || []),
                ...files.filter(
                  (file) =>
                    !isDuplicateImage(color.mainImage, color.extraImages, file)
                ),
              ],
            }
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
              extraImages: (color.extraImages || []).filter((image) => {
                if (image instanceof File) {
                  return image.name !== imageToDelete;
                }
                return image !== imageToDelete;
              }),
            }
          : color
      )
    );
    const color = selectedColors.find((color) => color.colorId === colorId);
    if (
      color?.extraImages?.includes(imageToDelete) &&
      typeof imageToDelete === "string"
    ) {
      setDeletedImages((prev) => [
        ...prev,
        {
          productId: productData.id,
          colorId: color.id,
          filename: imageToDelete,
        },
      ]);
    }
  };

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
        setCollections(fetchedCollections);
        setCategories(fetchedCategories);
        setSizes(fetchedSizes);

        if (productData.parentCategoryId === null) {
          const parentCategory = fetchedCategories.find(
            (cat) => cat.id === productData.categoryId
          );
          setParentCategoryId(parentCategory ? parentCategory.id : null);
          setChildCategoryId(null);
        } else {
          const parentCategory = fetchedCategories.find(
            (cat) => cat.id === productData.parentCategoryId
          );
          setParentCategoryId(parentCategory ? parentCategory.id : null);

          const childCategory = fetchedCategories.find(
            (cat) => cat.id === productData.categoryId
          );
          setChildCategoryId(childCategory ? childCategory.id : null);
        }
        if (productData?.prices) {
          const normalizedPrices = productData.prices.map((price) => ({
            ...price,
            price: parseFloat((price.price / 1000).toFixed(2)),
          }));
          setPrices(normalizedPrices);
          setInitialPrices(normalizedPrices);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInitialData();
  }, [productData]);

  useEffect(() => {
    if (productData?.prices?.length) {
      const currentDate = new Date();

      const currentPrice = productData.prices.find((price) => {
        const startDate = new Date(price.startDate);
        const endDate = price.endDate ? new Date(price.endDate) : null;

        return startDate <= currentDate && (!endDate || endDate >= currentDate);
      });

      if (currentPrice) {
        setStartDate(currentPrice.startDate);
      }
    }
  }, [productData]);

  useEffect(() => {
    if (productData?.colors) {
      const colorsData = productData.colors.map((color) => ({
        id: color.id,
        colorId: color.color,
        colorName: colors.find((c) => c.id === color.color)?.name || "Unknown",
        mainImage: color.mainImage || null,
        extraImages: color.images ? color.images.split(",") : [],
        totalSales: color.totalSales || 0,
        variants: color.variants.map((variant) => ({
          id: variant.id,
          sizeId: variant.sizeId,
          sizeName:
            sizes.find((s) => s.id === variant.sizeId)?.name || "Unknown",
          quantity: variant.quantity,
        })),
      }));
      setSelectedColors(colorsData);
    }
  }, [productData, sizes, colors]);

  const isStartDateInFuture = () => {
    const today = new Date();
    const selectedDate = new Date(startDate);
    return selectedDate > today;
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
  const handleUpdateClick = (e) => {
    e.preventDefault();
    setIsConfirmationModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setIsConfirmationModalOpen(false);
    if (!validateForm()) {
      alert("Please fill all required fields.");
      return;
    }

    const updatedColors = selectedColors.map((color) => ({
      id: color.id || null,
      color: color.colorId,
      mainImage:
        typeof color.mainImage === "string"
          ? color.mainImage
          : color.mainImage?.name || null,
      images:
        color.extraImages
          .map((img) => (typeof img === "string" ? img : img?.name))
          .filter(Boolean)
          .join(",") || null,
      totalSales: color.totalSales || 0,
      variants: color.variants.map((variant) => ({
        id: variant.id || null,
        sizeId: variant.sizeId,
        quantity: parseInt(variant.quantity, 10) || 0,
      })),
    }));

    const transformedPrices = prices.map((price) => {
      const isExistingPrice = initialPrices.some(
        (initialPrice) => initialPrice.id === price.id
      );

      return {
        id: isExistingPrice ? price.id : null,
        price: parseFloat(price.price * 1000) || 0,
        isDiscount: !!price.isDiscount,
        startDate: price.startDate,
        endDate: price.endDate || null,
      };
    });

    const updatedProduct = {
      id: productData?.id,
      name,
      description,
      isActive,
      categoryId: childCategoryId || parentCategoryId || null,
      parentCategoryId: parentCategoryId || null,
      collectionId,
      colors: updatedColors,
      prices: transformedPrices,
    };

    try {
      const newColorMapping = await updateProduct(productData, updatedProduct);

      for (const color of selectedColors) {
        const colorId =
          color.id ||
          newColorMapping.find((c) => c.colorId === color.colorId)?.id;

        if (colorId) {
          const images = [color.mainImage, ...color.extraImages].filter(
            (img) => img instanceof File
          );

          if (images.length > 0) {
            const uniqueImages = Array.from(
              new Set(images.map((img) => img.name))
            ).map((name) => images.find((img) => img.name === name));

            await uploadImages(uniqueImages, productData.id, colorId);
          }
        }
      }

      if (deletedImages.length > 0) {
        await deleteFiles(deletedImages);
        setDeletedImages([]);
      }
      alert("success");
      router.refresh();
    } catch (error) {
      console.error("Error updating product or uploading files:", error);
      alert("failure");
    }
  };

  const handleCategoryAdded = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const handleCollectionAdded = (newCollection) => {
    setCollections((prevCollections) => [...prevCollections, newCollection]);
  };

  const handlePricesUpdate = (updatedPrices) => {
    setPrices(updatedPrices);
  };
  
  const handleToggleCollapse = (colorId) => {
    setCollapsedColors((prev) => ({
      ...prev,
      [colorId]: !prev[colorId],
    }));
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

  return (
    <div className="p-4">
      <h1 className="mb-4 typography-headline-4 font-bold">Modify Product</h1>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Active Switch */}
        <div className="flex justify-between items-center">
          <span className="typography-label-sm">
            <strong>Active</strong>{" "}
          </span>
          <SfSwitch
            checked={isActive}
            onChange={() => {
              if (isStartDateInFuture()) {
                alert(
                  "The start date is in the future. You cannot toggle this switch."
                );
                return;
              }
              setIsActive(!isActive);
            }}
            disabled={false}
          />
        </div>
        <SfInput
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Product name"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product description"
          className="w-full border border-gray-300 rounded-md p-2"
          rows="4"
        />
        <SfSelect
          aria-label="Collection" 
          label="Collection"
          value={collectionId || ""}
          onChange={(e) => setCollectionId(e.target.value || null)}
        >
          <option value="">Select a collection</option>
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
        <SfSelect
          aria-label="Parent Category" 
          label="Parent Category"
          value={parentCategoryId || ""}
          onChange={(e) => setParentCategoryId(e.target.value || null)}
        >
          <option value="">Select a parent category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </SfSelect>

        <SfSelect
         aria-label="Child Category" 
          label="Child Category"
          value={childCategoryId || ""}
          onChange={(e) => setChildCategoryId(parseInt(e.target.value, 10))}
          disabled={!parentCategoryId}
        >
          <option value="">Select a child category</option>
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
        aria-label="Add New Category"
          style={{
            display: "block",
            margin: "0.5rem auto",
          }}
          type="button"
          onClick={() => setIsAddCategoryModalOpen(true)}
        >
          Add New Category
        </SfButton>
        {isAddCategoryModalOpen && (
          <AddCategoryModal
            closeModal={() => setIsAddCategoryModalOpen(false)}
            onCategoryAdded={handleCategoryAdded}
            parentCategories={categories}
          />
        )}

        {/* Price List */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "2rem",
          }}
        >
          <PriceList prices={prices} onPricesUpdate={handlePricesUpdate} />
        </div>
        <div>
          {/* Dropdown and Buttons */}
          <div style={{ position: "relative", marginBottom: "1rem" }}>
            <SfSelect
             aria-label="Choose Color" 
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
              aria-label="Add New Color"
                type="button"
                onClick={() => setIsAddColorModalOpen(true)}
                style={{ alignSelf: "flex-start" }}
              >
                Add New Color
              </SfButton>

              {/* Add Variant Button */}
              <SfButton
              aria-label="Add Variant"
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
              <h1
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong>{color.colorName}</strong>
                <span
                  style={{
                    fontSize: "1rem",
                    fontWeight: "normal",
                    marginLeft: "1rem",
                    color: "#555",
                  }}
                >
                  Total Sales: {color.totalSales}
                </span>
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
                  aria-label="Toogle Collapse"
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
                            src={
                              color.mainImage instanceof File
                                ? URL.createObjectURL(color.mainImage)
                                : `/${productData.id}/${color.id}/${color.mainImage}`
                            }
                            alt="Main"
                            style={{
                              maxWidth: "150px",
                              height: "auto",
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                            }}
                          />
                          <SfButton
                          aria-label="Delete Main Image"
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
                              src={
                                image instanceof File
                                  ? URL.createObjectURL(image)
                                  : `/${productData.id}/${color.id}/${image}`
                              }
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
                            aria-label="Delete Extra Image"
                              type="button"
                              onClick={() =>
                                handleExtraImageDelete(
                                  color.colorId,
                                  image instanceof File ? image.name : image
                                )
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
                          aria-label="Size" 
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
                    aria-label="Add New Size"
                      type="button"
                      onClick={() => setIsAddSizeModalOpen(true)}
                      style={{ alignSelf: "flex-start" }}
                    >
                      Add New Size
                    </SfButton>

                    {/* Add Size and Quantity Button */}
                    <SfButton
                    aria-label="Add Size and Quantity"
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
                        <span>{variant.sizeName}</span>
                        {/* Editable Quantity Input */}
                        <SfInput
                          type="number"
                          value={variant.quantity}
                          min="0"
                          onChange={(e) => {
                            const updatedQuantity = parseInt(
                              e.target.value,
                              10
                            );
                            if (!isNaN(updatedQuantity)) {
                              setSelectedColors((prevColors) =>
                                prevColors.map((colorItem) =>
                                  colorItem.colorId === color.colorId
                                    ? {
                                        ...colorItem,
                                        variants: colorItem.variants.map(
                                          (v, index) =>
                                            index === vIndex
                                              ? {
                                                  ...v,
                                                  quantity: updatedQuantity,
                                                }
                                              : v
                                        ),
                                      }
                                    : colorItem
                                )
                              );
                            }
                          }}
                          style={{
                            maxWidth: "60px",
                            textAlign: "center",
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        ))}

        <SfButton
        aria-label="Update Product"
          type="button"
          style={{
            display: "block",
            margin: "1rem auto",
          }}
          onClick={handleUpdateClick}
        >
          Update Product
        </SfButton>
      </form>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleFormSubmit}
        message="Are you sure you want to update this product?"
        status={status}
      />
    </div>
  );
}
