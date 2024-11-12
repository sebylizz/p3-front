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
    <div className="modify-product-container">
      <h2>Modify Product</h2>
      {showSuccessMessage && <AlertPositive message="Product added successfully!" />}
      {showErrorMessage && <AlertError message="An error ocurred, product could not be added. Please try again!" />}
      <form onSubmit={handleSubmit} className="modify-product-form">
        
        {/* Name Input */}
        <div>
          <label>Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
        </div>

        {/* Size Input */}
        <div>
          <label>Size:
            <input type="text" value={size} onChange={(e) => setSize(e.target.value)} required />
          </label>
        </div>

        {/* Price Input */}
        <div>
          <label>Price:
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </label>
        </div>
           {/* Main Image Display and Upload */}
           <div>
          <label>Main Image:</label>
          <div className="image-preview">
            {mainImage && (
              <div style={{ display: 'inline-block', margin: '5px', position: 'relative' }}>
                <img
                  src={mainImage instanceof File ? URL.createObjectURL(mainImage) : `/${productData.id}/${mainImage}`}
                  alt="Main Image"
                  style={{ width: '100px', height: 'auto' }}
                />
                <button
                  type="button"
                  onClick={() => setMainImage(null)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  X
                </button>
              </div>
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleMainImageChange} />
        </div>

        {/* Existing Images Display with Delete Option */}
        <div>
          <label>Current Images:</label>
          <div className="image-preview">
            {images.map((image, index) => (
              <div key={index} style={{ display: 'inline-block', margin: '5px', position: 'relative' }}>
                <img
                  src={`/${productData.id}/${image}`} 
                  alt={`Existing Image ${index}`}
                  style={{ width: '100px', height: 'auto' }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(image)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* New Image Upload */}
        <div>
          <label>Upload New Images:
            <input type="file" multiple accept="image/*" onChange={handleImageChange} />
          </label>
        </div>

        {/* Quantity Input */}
        <div>
          <label>Quantity:
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
          </label>
        </div>

 {/* New Image Previews with Delete Option */}
 <div className="image-preview">
        {images.length > 0 && (
          <h3>Selected Images:</h3>
        )}
        <div className="image-thumbnails">
          {newImages.map((image, index) => (
            <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '5px' }}>
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                style={{ width: '100px', height: 'auto' }}
              />
              <button
                type="button"
                onClick={() => handleDeleteImage(image)}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                }}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

        {/* Submit Button */}
        <button type="submit" style={{ marginTop: '20px' }}>Update Product</button>
      </form>
    </div>
  );
}
