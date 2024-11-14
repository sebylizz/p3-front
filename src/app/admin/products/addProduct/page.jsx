"use client"

import React, { useState } from 'react';

import addProduct from '@/app/lib/addProduct';
import uploadImages from '@/app/lib/uploadImages';
import AlertPositive from '@/app/components/okAlert';
import AlertError from '@/app/components/errorAlert';


export default function AddProduct() {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState(0);  // Initialized to 0
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState([]); 
  const [quantity, setQuantity] = useState(0);  // Initialized to 0
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

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
  
    if (mainImage.length===0 && images.length === 0) {
      alert("Please select images before submitting.");
      return;
    }
    const mainImageName = mainImage instanceof File ? mainImage.name : mainImage;
    const uniqueImages= images.filter((image) => image.name !== mainImageName);
  
    try {

      const imagesString = uniqueImages.map(file => file.name).join(",");

        const newProduct = {
        name,
        size,
        mainImage: mainImageName,
        image: imagesString,
        price,
        quantity,
      };

      const res = await addProduct(newProduct);
      console.log(res);
      console.log(res.id);
      if (!res.id) throw new Error("Failed to add product");
      const uploadedImages = await uploadImages(uniqueImages, res.id); 
      const uploadMainImage= await uploadImages([mainImage], res.id);
      
      setName('');
      setSize('');
      setPrice(0);
      setMainImage([]);
      setImages([]);
      setQuantity(0);
      console.log("Product added successfully!");
      setTimeout(() => setShowSuccessMessage(false), 3000);

    } catch (error) {
      console.error("Submission error:", error);
      setShowErrorMessage(true);

      setTimeout(() => setShowErrorMessage(false), 3000);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); 
    setImages((prevImages) => [...prevImages, ...files]); 
    console.log(images);
  };
  const handleDeleteImage = (imageToDelete) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image !== imageToDelete)
    );
  };
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    setMainImage(file);
  };
  const handleMainImageDelete = () => {
    setMainImage(null); // Set mainImage back to null to remove it
  };


  return (
    <div className="add-product-container">
       {showSuccessMessage && <AlertPositive message="Product added successfully!" />}
       {showErrorMessage && <AlertError message="An error ocurred, product could not be added. Please try again!" />}
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }} 
            />
          </label>
        </div>
        <div>
          <label>
            Size:
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required
              style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px'}} 
            />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}  // Parse to number directly
              step="0.01"
              required
              style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }} 
            />
          </label>
        </div>
        <div>
          <label>
            Main image:
            <input
              type="file"
              accept="image/*"
              onChange={handleMainImageChange}
              required
              style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
            />
          </label>
        </div>
        <div>
          <label>
            Images:
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              required
              style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px'}} 
            />
          </label>
        </div>
        <div>
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}  // Parse to number directly
              required
              style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }} 
            />
          </label>
        </div>
        <button type="submit">Add Product</button>
      </form>
      <div className="image-preview">
  {mainImage instanceof File && (
    <div className="image-thumbnails" style={{ position: 'relative', display: 'inline-block' }}>
      <img
        src={URL.createObjectURL(mainImage)}
        alt="Main Image Preview"
        style={{ width: '100px', height: 'auto', margin: '5px' }}
      />
      <button
        type="button"
        onClick={handleMainImageDelete}
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
  )}
</div>
 {/* Image Previews with Delete Option */}
 <div className="image-preview">
        {images.length > 0 && (
          <h3>Selected Images:</h3>
        )}
        <div className="image-thumbnails">
          {images.map((image, index) => (
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
    </div>
  );
}
