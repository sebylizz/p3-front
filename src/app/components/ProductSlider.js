// ProductSlider.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the router for navigation
import productFetcher from '../lib/productFetcher';
import ProductCardVertical from './ProductCard';
import { Grid, CircularProgress } from '@mui/material';

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    productFetcher().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ minHeight: '70vh', paddingTop: '20px', paddingBottom: '20px', marginLeft: '10%', marginRight: '10%' }}>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            {/* Use onClick to navigate */}
            <div 
              style={{ cursor: 'pointer' }}
              onClick={() => router.push(`/productPage/${product.id}`)} // Navigate on click
            >
              <ProductCardVertical
                name={product.name}
                image={product.mainImage}
                price={product.price}
                description={product.description} // Optional
              />
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductSlider;
