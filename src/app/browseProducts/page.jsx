'use client';

import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/productContext';
import ProductSlider from '../components/browseProductSlider';
import getCategories from '../lib/getCategories';
import { MenuItem, Select, FormControl, InputLabel, Box, Typography } from '@mui/material';

export default function BrowseProductsPage() {
    const { products } = useProducts();

    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [category, setCategory] = useState('all');

    useEffect(() => {
        async function fetchCategories() {
            const categoryData = await getCategories(); 
            setCategories(categoryData);
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        applyCategoryFilter();
    }, [category, products, categories]);

    const getAllChildCategoryIds = (parentCategoryId) => {
        const childCategories = categories.filter(
            (cat) => cat.parentCategory && cat.parentCategory.id === parentCategoryId
        );

        const childIds = childCategories.map((child) => child.id);
        return childIds.reduce(
            (allIds, childId) => [...allIds, childId, ...getAllChildCategoryIds(childId)],
            []
        );
    };

    const applyCategoryFilter = () => {
        if (category === 'all') {
            setFilteredProducts(products);
        } else {
            const selectedCategory = categories.find((cat) => cat.name === category);

            if (selectedCategory) {
                const categoryId = selectedCategory.id;
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
                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.name}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <ProductSlider filteredProducts={filteredProducts} />
        </Box>
    );
}
