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
  
    if (images.length === 0) {
      alert("Please select images before submitting.");
      return;
    }
  
    try {
      const files = await uploadImages(images);
      const imagesString = files.join(",");
  
      const newProduct = {
        name,
        size,
        image: imagesString,
        price,
        quantity,
      };
  
      await addProduct(newProduct);
      console.log("Product added successfully!");
      setShowSuccessMessage(true);

      setTimeout(() => setShowSuccessMessage(false), 3000);
      
      // Reset form
      setName('');
      setSize('');
      setPrice(0);
      setImages([]);
      setQuantity(0);

    } catch (error) {
      console.error("Submission error:", error);
      setShowErrorMessage(true);

      setTimeout(() => setShowErrorMessage(false), 3000);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); 
    setImages(files); 
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
        {images.length > 0 && (
          <h3>Selected Images:</h3>
        )}
        <div className="image-thumbnails">
          {images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)} 
              alt={`Preview ${index}`}
              style={{ width: '100px', height: 'auto', margin: '5px' }} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
