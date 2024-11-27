'use client';

import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/productContext';
import ProductSlider from '../components/browseProductSlider';
import { MenuItem, Select, FormControl, InputLabel, Box, Typography } from '@mui/material';

export default function BrowseProductsPage() {
    const { products } = useProducts();

    const categoriesMap = { // Mapping IDs to match the database
        1: { name: 'Clothing', children: [2, 5, 6, 7] },
        2: { name: 'Hoodies', children: [] },
        3: { name: 'Accessories', children: [] },
        4: { name: 'Basketballs', children: [] },
        5: { name: 'T-shirts', children: [] },
        6: { name: 'Shorts', children: [] },
        7: {name: 'Sweatpants', children: []}
    };

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [category, setCategory] = useState('all');

    useEffect(() => {
        applyCategoryFilter();
    }, [category, products]);

    const getAllChildCategoryIds = (parentCategoryId) => {
        const category = categoriesMap[parentCategoryId];
        if (!category) return [];

        const childCategoryIds = category.children || [];
        return childCategoryIds.reduce(
            (allIds, childId) => [...allIds, childId, ...getAllChildCategoryIds(childId)],
            []
        );
    };

    const applyCategoryFilter = () => {
        if (category === 'all') {
            setFilteredProducts(products);
        } else {
            const selectedCategory = Object.entries(categoriesMap).find(
                ([_, value]) => value.name === category
            );

            if (selectedCategory) {
                const categoryId = parseInt(selectedCategory[0], 10);
                const categoryIdsToFilter = [categoryId, ...getAllChildCategoryIds(categoryId)];

                setFilteredProducts(
                    products.filter((product) => categoryIdsToFilter.includes(product.categoryId))
                );
            } else {
                setFilteredProducts([]);
            }
        }
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>
                Browse Products
            </Typography>
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
                        {Object.values(categoriesMap).map((cat) => (
                            <MenuItem key={cat.name} value={cat.name}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <ProductSlider filteredProducts={filteredProducts} />
        </Box>
    );
};