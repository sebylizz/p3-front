import React from 'react';
import { useCart } from '../context/cartContext';


export default function AddToCartButton({ selectedSize, product }) {
  const { addToCart } = useCart();

  const handleClick = () => {
    if (selectedSize) {
      addToCart(product.id); // Only pass the product ID to the cart if a size is selected
    } else {
      alert("Please select a size.");
    }
  };

  return (
    <button
      className={`w-full p-4 mt-4 text-white ${selectedSize ? 'bg-black' : 'bg-gray-400 cursor-not-allowed'}`}
      disabled={!selectedSize}
      onClick={handleClick}
    >
      {selectedSize ? 'Add to Cart' : 'Select a Size'}
    </button>
  );
}
