import React from "react";
import { useCart } from "../context/cartContext";
import quantityAddLimit from "../lib/quantityAddLimit";

export default function AddToCartButton({ selectedSize, productId, colorId, products }) {
    const { addToCart, getProductQuantity } = useCart();

    const handleClick = () => {
        if (selectedSize) {
            const variantId = `${productId}/${colorId}/${selectedSize}`;
            const currentQuantity = getProductQuantity(variantId);

            if (quantityAddLimit(variantId, currentQuantity, products)) {
                addToCart(variantId);
            } else {
                alert("Cannot add more of this product. Not enough stock.");
            }
        }
    };

    return (
        <button
            className={`w-full p-4 mt-4 text-white ${selectedSize ? "bg-black" : "bg-gray-400 cursor-not-allowed"}`}
            disabled={!selectedSize}
            onClick={handleClick}
        >
            {selectedSize ? "Add to Cart" : "Select a Size"}
        </button>
    );
}
