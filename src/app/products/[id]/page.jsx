import React from 'react';
import productFetcher from '../../GetProducts';
import { notFound } from 'next/navigation';

export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await productFetcher();
 
  return products.map((product) => ({
    id: product.id.toString(), // Ensure id is a string
  }));
}

export async function getProduct(id) {
  const response = await fetch(`http://localhost:8080/products/getproducts/${id}`);
  
  if (!response.ok) {
      notFound(); // Trigger a 404 page if the product is not found
  }
  
  try {
    return await response.json();
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    notFound();
  }
}

export default async function ProductDetail({ params }) {
  const { id } = await params
  const product = await getProduct(id);


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
