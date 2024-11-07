"use client"
// ProductContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import productFetcherJSX from '../lib/GetProducts'

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch products, allowing it to be called on demand
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productFetcherJSX();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch when the provider mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Expose `products`, `loading`, and `refetchProducts` for on-demand fetching
  return (
    <ProductContext.Provider value={{ products, loading, refetchProducts: fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to access the context
export const useProducts = () => useContext(ProductContext);
