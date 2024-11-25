// ProductSlider.jsx
'use client';

import React from 'react';
import { Grid, CircularProgress } from '@mui/material';
import ProductCardVertical from './ProductCard';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/app/context/productContext';

const ProductSlider = ({ filteredProducts }) => {
    const { products: allProducts, loading } = useProducts();
    const router = useRouter();

    // Use filtered products if provided, otherwise fall back to all products
    const productsToDisplay = filteredProducts || allProducts;

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div style={{ minHeight: '70vh', paddingTop: '20px', paddingBottom: '20px', marginLeft: '10%', marginRight: '10%' }}>
            <Grid container spacing={2}>
                {productsToDisplay.map((product) => (
                    <Grid xs={12} sm={6} md={4} key={product.id}>
                        <div
                            style={{ cursor: 'pointer' }}
                            onClick={() => router.push(`/productPage/${product.id}`)}
                        >
                            <ProductCardVertical
                                name={product.name}
                                image={product.id + '/' + product.mainImage}
                                price={product.price}
                                description={product.description}
                            />
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ProductSlider;
