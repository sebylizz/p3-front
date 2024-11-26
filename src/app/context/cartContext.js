"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import getCart from "../lib/getCart";
import setCartInCookies from "../lib/setCart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart data from cookies when the provider mounts
    useEffect(() => {
        const loadCart = async () => {
            const savedCart = await getCart();
            if (savedCart) {
                setCart(savedCart);
            }
        };
        loadCart();
    }, []);

    // Save cart data to cookies whenever it changes
    useEffect(() => {
        setCartInCookies(cart); // Expires in 2 days
    }, [cart]);

    // Add product ID directly to the cart
    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    // Increase the quantity of a product
    const increaseQuantity = (product) => {
        setCart((prevCart) => [...prevCart, product]); // Add product to cart
    };

    // Decrease the quantity of a product
    const decreaseQuantity = (product) => {
        setCart((prevCart) => {
            const index = prevCart.indexOf(product); // Ensure comparison uses integers
            if (index !== -1) {
                const updatedCart = [...prevCart.slice(0, index), ...prevCart.slice(index + 1)];
                return updatedCart;
            }
            return prevCart; // Return unmodified cart if not found
        });
    };

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the Cart context
export const useCart = () => useContext(CartContext);
