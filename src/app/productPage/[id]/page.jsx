'use client';

import { useParams } from 'next/navigation'; // Use useParams from next/navigation
import { useState, useEffect } from 'react';
import ImageGallery from '../../components/ImageGallery';
import ProductInfo from '../../components/ProductInfo';
import SizeSelector from '../../components/SizeSelector';
import AddToCartButton from '../../components/AddToCartButton';
import productFetcher from '../../lib/importProducts';  // Import the productFetcher

export default function ProductDetailsPage() {
  const { id } = useParams(); // Extract the 'id' from the dynamic route parameters
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          // Fetch all products
          const products = await productFetcher();
          // Find the specific product by id
          const selectedProduct = products.find(p => p.id === parseInt(id));
          // Update the state with the selected product
          if (selectedProduct) {
            setProduct(selectedProduct);
            setLoading(false);
          } else {
            console.error("Product not found:", id);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;  // Show loading message if product is not yet fetched
  }

  if (!product) {
    return <p>Product not found or failed to load.</p>;  // Handle error in case no product is found
  }

  // Use the main image if available, else fallback to the first image
  const mainImage = product.mainImage || product.image;

  return (
    <div className="flex p-8">
      {/* Left Column: Image Gallery */}
      <div className="w-1/4 pr-4">
        <ImageGallery 
          images={[product.image, product.mainImage].filter(Boolean)} // Pass array of images to ImageGallery component
          onImageSelect={setSelectedImage}  // Update selected image when a thumbnail is clicked
        />
      </div>

      {/* Right Column: Product Details */}
      <div className="w-3/4">
        <div className="flex">
          {/* Main Image */}
          <div className="w-1/2">
            <img 
              src={selectedImage ? `/images/${selectedImage}` : `/images/${mainImage}`} // Assuming images are stored in the public/images directory
              alt={product.name}
              className="rounded-md object-cover"
              style={{ maxWidth: '100%', height: 'auto' }} // Ensure image fits well in the container
            />
          </div>

          {/* Product Information */}
          <div className="w-1/2 pl-4">
            <ProductInfo 
              name={product.name} 
              price={product.price} 
              discount={product.discount}  // Adjust if needed based on the response data
              colors={product.colors || []}  // Adjust if needed, ensure default empty array if no colors
            />
            <SizeSelector sizes={[product.size]} onSizeSelect={setSelectedSize} />
            <AddToCartButton selectedSize={selectedSize} />
          </div>
        </div>
      </div>
    </div>
  );
}
