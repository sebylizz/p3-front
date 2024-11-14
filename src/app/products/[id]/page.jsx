"use client";

import React, { useEffect, useState } from 'react';
import { useProducts } from '@/app/context/productContext';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function ProductDetail({ params }) {
  const { id } = use(params); // Unwrap params with `use`
  const { products, loading } = useProducts();
  const [product, setProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      const selectedProduct = products.find((p) => p.id.toString() === id);
      if (selectedProduct) {
        setProduct(selectedProduct);
      } else {
        router.push('/404'); // Navigate to a 404 page if not found
      }
    }
  }, [id, products, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  // Render product details
  return (
    <section>
      <h1>{product.name}</h1>
      <p>Product ID: {product.id}</p>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
    </section>
  );
}
