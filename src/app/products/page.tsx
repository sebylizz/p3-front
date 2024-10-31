"use client"
import React from 'react';
import productFetcher from '../GetProducts';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from "next/link";
import BouncingBall from '../loader'



export default  function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await productFetcher();
      setProducts(data);
    }

    fetchProducts();
  }, []);
  console.log(productFetcher);
  return (
    <>
      {products.length > 0 ? (
        products.map((product) => (
          <div className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]" key={product.id}>
          
              <Link className="block" href={`/products/${product.id}`}>
                <div className="relative">
                  <img
                    src={product.image || "/image.png"} // Adjust the image path
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
        ))
      ) : (
        <p>Damns</p>
      )}
    </>
);
}
