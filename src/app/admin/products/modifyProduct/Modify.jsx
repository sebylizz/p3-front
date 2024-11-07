"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import uploadImages from '@/app/lib/uploadImages';
import updateProduct from '@/app/lib/updateProduct';
import removeImage from '@/app/lib/removeImage';

export default function ModifyProduct({ productData }) {
  const router = useRouter();

  const [name, setName] = useState(productData.name || '');
  const [size, setSize] = useState(productData.size || '');
  const [price, setPrice] = useState(productData.price || 0);
  const [images, setImages] = useState(productData.image ? productData.image.split(",") : []);
  const [quantity, setQuantity] = useState(productData.quantity || 0);
  const [newImages, setNewImages] = useState([]); 

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files); 
  };


  const handleRemoveImage = async (imageName) => {
    const updatedImages = images.filter((image) => image !== imageName);
    setImages(updatedImages);
    await removeImage(imageName, images, setImages);
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
  
    if (images.length === 0 && newImages.length==0) {
      alert("Please select images before submitting.");
      return;
    }
  
    if (newImages.length>0){
      const files = await uploadImages(newImages);
      var imagesString = files.join(",");
      
    }
    var imageFilenamesOld=images.join(",");
      const imageFilenames = imageFilenamesOld && imagesString 
    ? `${imageFilenamesOld},${imagesString}` 
    : imageFilenamesOld || imagesString;
      const updatedProduct = {
      name,
      size,
      price: parseInt(price, 10),
      image: imageFilenames,
      quantity: parseInt(quantity, 10),
    };
    try {
      await updateProduct(productData, updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="modify-product-container">
      <h2>Modify Product</h2>
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

        {/* Existing Images Display with Delete Option */}
        <div>
          <label>Current Images:</label>
          <div className="image-preview">
            {images.map((image, index) => (
              <div key={index} style={{ display: 'inline-block', margin: '5px', position: 'relative' }}>
                <img
                  src={`/${image}`} 
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

        {/* Display Preview of New Images */}
        <div className="image-preview">
          {newImages.length > 0 && (
            <h3>Selected Images:</h3>
          )}
          <div className="image-thumbnails">
            {newImages.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)} 
                alt={`Preview ${index}`}
                style={{ width: '100px', height: 'auto', margin: '5px' }} 
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" style={{ marginTop: '20px' }}>Update Product</button>
      </form>
    </div>
  );
}
