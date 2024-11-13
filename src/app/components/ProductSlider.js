'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import productFetcher from '../lib/importProducts';
import ProductCardVertical from './ProductCard';
import { Grid, CircularProgress } from '@mui/material';

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
            {/* Remove the nested <a> and just use Link */}
            <Link href={`/productPage/${product.id}`} passHref>
              <div style={{ cursor: 'pointer' }}>
                <ProductCardVertical
                  name={product.name}
                  image={product.img}
                  price={product.price}
                  description={product.description} // Optional, if you want to display it
                />
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductSlider;
