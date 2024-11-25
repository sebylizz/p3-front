// BrowseProductsPage.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/productContext';
import ProductSlider from '../components/browseProductSlider';
import { Button, MenuItem, Select, FormControl, InputLabel, Box, Typography, Slider, TextField } from '@mui/material';

const BrowseProductsPage = () => {
    const { products } = useProducts();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filters, setFilters] = useState({
        size: 'all',
        color: 'all',
        priceRange: [0, 10000], // Assuming the price range starts from 0 to 10,000
        sort: 'neutral',
    });

    const [tempFilters, setTempFilters] = useState({ ...filters }); // Temporary filters for editing

    useEffect(() => {
        applyFilters();
    }, [products, filters]);

    const applyFilters = () => {
        let tempProducts = [...products];

        // Filter by size
        if (filters.size !== 'all') {
            tempProducts = tempProducts.filter((product) => product.size === filters.size);
        }

        // Filter by color
        if (filters.color !== 'all') {
            tempProducts = tempProducts.filter((product) => product.color === filters.color);
        }

        // Filter by price range
        tempProducts = tempProducts.filter(
            (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
        );

        // Sort products
        if (filters.sort === 'price-low-to-high') {
            tempProducts.sort((a, b) => a.price - b.price);
        } else if (filters.sort === 'price-high-to-low') {
            tempProducts.sort((a, b) => b.price - a.price);
        } else if (filters.sort === 'discount') {
            tempProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        }

        setFilteredProducts(tempProducts);
    };

    const handleTempFilterChange = (key, value) => {
        setTempFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSaveFilter = (key) => {
        setFilters((prev) => ({
            ...prev,
            [key]: tempFilters[key],
        }));
    };

    const handleResetFilter = (key, defaultValue) => {
        setTempFilters((prev) => ({
            ...prev,
            [key]: defaultValue,
        }));
        setFilters((prev) => ({
            ...prev,
            [key]: defaultValue,
        }));
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>
                Browse Products
            </Typography>

            {/* Filters */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '15px',
                    marginBottom: '20px',
                }}
            >
                {/* Size Filter */}
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="size-filter-label">Size</InputLabel>
                    <Select
                        labelId="size-filter-label"
                        value={tempFilters.size}
                        onChange={(e) => handleTempFilterChange('size', e.target.value)}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="Small">Small</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Large">Large</MenuItem>
                    </Select>
                    <Box sx={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                        <Button variant="contained" size="small" onClick={() => handleSaveFilter('size')}>
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleResetFilter('size', 'all')}
                        >
                            Reset
                        </Button>
                    </Box>
                </FormControl>

                {/* Color Filter */}
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="color-filter-label">Color</InputLabel>
                    <Select
                        labelId="color-filter-label"
                        value={tempFilters.color}
                        onChange={(e) => handleTempFilterChange('color', e.target.value)}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="red">Red</MenuItem>
                        <MenuItem value="blue">Blue</MenuItem>
                        <MenuItem value="green">Green</MenuItem>
                        <MenuItem value="black">Black</MenuItem>
                        <MenuItem value="white">White</MenuItem>
                    </Select>
                    <Box sx={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                        <Button variant="contained" size="small" onClick={() => handleSaveFilter('color')}>
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleResetFilter('color', 'all')}
                        >
                            Reset
                        </Button>
                    </Box>
                </FormControl>

                {/* Price Range Filter */}
                <FormControl sx={{ minWidth: 120 }}>
                    <Typography>Price Range</Typography>
                    <Slider
                        value={tempFilters.priceRange}
                        onChange={(e, newValue) => handleTempFilterChange('priceRange', newValue)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={10000} // Set your max price
                        step={100} // Set your step size
                        sx={{ marginTop: '10px', width: '200px' }}
                    />
                    <Box sx={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleSaveFilter('priceRange')}
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleResetFilter('priceRange', [0, 10000])}
                        >
                            Reset
                        </Button>
                    </Box>
                </FormControl>

                {/* Sort Filter */}
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="sort-filter-label">Sort</InputLabel>
                    <Select
                        labelId="sort-filter-label"
                        value={tempFilters.sort}
                        onChange={(e) => handleTempFilterChange('sort', e.target.value)}
                    >
                        <MenuItem value="neutral">Neutral</MenuItem>
                        <MenuItem value="price-low-to-high">Price: Low to High</MenuItem>
                        <MenuItem value="price-high-to-low">Price: High to Low</MenuItem>
                        <MenuItem value="discount">Discount</MenuItem>
                    </Select>
                    <Box sx={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                        <Button variant="contained" size="small" onClick={() => handleSaveFilter('sort')}>
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleResetFilter('sort', 'neutral')}
                        >
                            Reset
                        </Button>
                    </Box>
                </FormControl>
            </Box>

            {/* Product Slider */}
            <ProductSlider products={filteredProducts} />
        </Box>
    );
};

export default BrowseProductsPage;
