// ProductSlider.jsx
'use client';

import React from 'react';
import { Grid2, CircularProgress } from '@mui/material';
import ProductCard from './ProductCard';
import { useProducts } from '@/app/context/productContext';

const BrowseProductSlider = ({ filteredProducts }) => {
    const { products, loading } = useProducts();

    // Use filtered products if provided, otherwise fall back to all products
    const productsToDisplay = filteredProducts || products;

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div style={{ minHeight: '70vh', paddingTop: '20px', paddingBottom: '20px', marginLeft: '10%', marginRight: '10%' }}>
            <Grid2 container spacing={2}>
                {productsToDisplay.map((product) => (
                    product?.colors?.map((color) => (
                        <Grid2 xs={12} sm={6} md={4} key={color.id}>
                            <ProductCard
                                name={product.name}
                                image={product.id + '/' + color.id + '/' + color.mainImage}
                                price={product.price / 100}
                                productId={product.id}
                                colorId={color.id}
                            />

                        </Grid2>
                    ))
                ))}
            </Grid2>
        </div>
    );
};

export default BrowseProductSlider;
