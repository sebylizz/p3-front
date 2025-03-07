"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import productFetcher from '../lib/GetProducts';

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    if (query) {
      const fetchAndFilterProducts = async () => {
        setLoading(true);
        try {
          const allProducts = await productFetcher(); 
          const searchedProducts = allProducts.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
          );
          setProducts(searchedProducts);
        } catch (error) {
          console.error('Error fetching products:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchAndFilterProducts(); 
    } else {
      setProducts([]); 
      setLoading(false); 
    }
  }, [query]);


  return (
    <div>
      <h1>Search Results for: {query}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <div className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]" key={product.id}>
              <Link href={`/products/${product.id}`}>
                <div className="relative">
                  <img
                    src={product.image || "/image.png"}
                    alt={product.name}
                    className="object-cover h-auto rounded-md aspect-square"
                    width="300"
                    height="300"
                  />
                </div>
                <div className="p-4 border-t border-neutral-200">
                  <span className="block no-underline">{product.name}</span>
                  <span className="block pb-2 font-bold typography-text-lg">{product.price}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
