// ProductSlider.jsx
'use client';

import React, { useEffect } from 'react';
import { useProducts } from '@/app/context/productContext';
import { Grid2, CircularProgress } from '@mui/material';
import ProductCardVertical from './ProductCard';
import { useRouter } from 'next/navigation';

const ProductSlider = () => {
    const { products, loading } = useProducts();
    const router = useRouter();

    useEffect(() => {
    }, [products, loading]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div style={{ minHeight: '70vh', paddingTop: '20px', paddingBottom: '20px', marginLeft: '10%', marginRight: '10%' }}>
            <Grid2 container spacing={2}>
                {products.map((product) => (
                    <Grid2 xs={12} sm={6} md={4} key={product.id}>
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
                    </Grid2>
                ))}
            </Grid2>
        </div>
    );
};

export default ProductSlider;
