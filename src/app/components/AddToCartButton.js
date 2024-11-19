import React from 'react';

export default function AddToCartButton({ selectedSize }) {
  return (
    <button 
      className={`w-full p-4 mt-4 text-white ${selectedSize ? 'bg-black' : 'bg-gray-400 cursor-not-allowed'}`}
      disabled={!selectedSize}
    >
      {selectedSize ? 'Add to Cart' : 'Select a Size'}
    </button>
  );
}
