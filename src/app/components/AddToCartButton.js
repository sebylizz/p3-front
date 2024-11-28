import React from 'react';
import { useCart } from '../context/cartContext';


export default function AddToCartButton({ selectedSize, productId, colorId }) {
  const { addToCart } = useCart();

  const handleClick = () => {
    if (selectedSize) {
      const p = `${productId}/${colorId}/${selectedSize}`;
      addToCart(p);
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

