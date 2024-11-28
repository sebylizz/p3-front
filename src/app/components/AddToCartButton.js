import React from 'react';
import { useCart } from '../context/cartContext';


export default function AddToCartButton({ productId, colorId, selectedSize }) {
    const { addToCart } = useCart();

    const handleClick = () => {
        const p = `${productId}/${colorId}/${selectedSize}`;
        console.log(p);
        addToCart(p);
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
