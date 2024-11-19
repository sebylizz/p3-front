'use client';

import React, { useEffect, useState } from 'react';
import { useProducts } from '@/app/context/productContext';
import { Grid2, Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';

const ProductSlider = () => {
    const { products, loading } = useProducts();

    useEffect(() => {
    }, [products, loading]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div style={{ minHeight: '70vh', paddingTop: '20px', paddingBottom: '20px', marginLeft: '10%', marginRight: '10%' }}>
            <Grid2 container spacing={2}>
                {products.map((p) => (
                    <Grid2 xs={12} sm={6} md={4} key={p.id}>
                        <Card style={{ margin: '10px' }}>
                            <div style={{ position: 'relative', paddingTop: '100%' }}>
                                <CardMedia
                                    component="img"
                                    image={'placeholder.jpg'}
                                    onError={(e) => image = 'placeholder.jpg'}
                                    alt={p.name}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                            <CardContent>
                                <Typography variant="h6">{p.name}</Typography>
                                <Typography variant="body2">Size: {p.size}</Typography>
                                <Typography variant="body2">Price: 69 DKK</Typography>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </div>
    );
};

export default ProductSlider;
