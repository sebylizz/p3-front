'use client';

import React, { useEffect, useState } from 'react';
import productFetcher from '../lib/importProducts';
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';

const ProductSlider = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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
                        <Card style={{ margin: '10px' }}>
                            <div style={{ position: 'relative', paddingTop: '100%' }}>
                                <CardMedia
                                    component="img"
                                    image={product.main_image}
                                    alt={product.name}
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
                                <Typography variant="h6">{product.name}</Typography>
                                <Typography variant="body2">Size: {product.size}</Typography>
                                <Typography variant="body2">Price: {product.price} DKK</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ProductSlider;
