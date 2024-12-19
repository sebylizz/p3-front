"use client"
import React, { useEffect, useState } from 'react';
import productFetcherJSX from '../lib/GetProducts';
import Link from "next/link";

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const data = await productFetcherJSX();
            setProducts(data);
        }

        fetchProducts();
    }, []);
    return (
        <>
            {products.length > 0 ? (
                products.map((product) => (
                    <div
                        className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]"
                        key={product.id}
                    >
                        <Link href={`/products/${product.id}`} className="block">
                            <div className="relative">
                                <img
                                    src={`${product.image ? `/${product.id}/${product.image}` : "/basketball.jpg"}`}
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
                <p>No products available</p>
            )}
        </>
    );
}
