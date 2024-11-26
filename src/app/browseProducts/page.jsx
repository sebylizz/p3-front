// BrowseProductsPage.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/productContext';
import ProductSlider from '../components/BrowseProductSlider';
import { MenuItem, Select, FormControl, InputLabel, Box, Typography } from '@mui/material';

const BrowseProductsPage = () => {
    const { products } = useProducts();
    const [filteredProducts, setFilteredProducts] = useState(products); // Filtered products state
    const [category, setCategory] = useState('all'); // Category filter state

    useEffect(() => {
        applyCategoryFilter(); // Apply category filter whenever the category or products change
    }, [category, products]);

    // Function to filter products by category
    const applyCategoryFilter = () => {
        if (category === 'all') {
            setFilteredProducts(products); // Show all products
        } else {
            setFilteredProducts(products.filter((product) => product.category === category));
        }
    };

    

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>
                Browse Products
            </Typography>

            {/* Category Filter */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '20px',
                }}
            >
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="category-filter-label"></InputLabel>
                    <Select
                        labelId="category-filter-label"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="BasketBall">BasketBalls</MenuItem>
                        <MenuItem value="Clothing">Clothing</MenuItem>
                        <MenuItem value="Hoodie">Hoodies</MenuItem>
                    </Select>
                </FormControl>

            </Box>

            {/* Product Slider */}
            <ProductSlider filteredProducts={filteredProducts} />
        </Box>
    );
};

export default BrowseProductsPage;
