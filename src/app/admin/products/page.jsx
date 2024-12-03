"use client";

import React, { useState, useEffect } from "react";
import allProducts from "@/app/lib/getAllProducts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import sanitizeInput from "@/app/lib/sanitizeInput";
import { SfLoaderCircular } from "@storefront-ui/react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const data = await allProducts();
      setProducts(data);
      console.log(data);
    } catch (error){ 
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleModify = (id) => {
    router.push(`products/modifyProduct/${id}`);
  };

  const handleSearchChange = (e) => {
    const sanitizedQuery = sanitizeInput(e.target.value);
    setSearchQuery(sanitizedQuery);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SfLoaderCircular size="xl" />
      </div>
    );
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <div className="relative flex w-full max-w-md">
          <input
            type="search"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Product Table */}
      <div className="my-2 mx-1 flex justify-center">
        <table className="table-auto border-collapse border border-gray-300">
          <thead className="bg-[#84B0CA] text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={
                      product.colors &&
                      product.colors[0] &&
                      product.colors[0].mainImage
                        ? `${product.id}/${product.colors[0].id}/${product.colors[0].mainImage}`
                        : "default-image.jpg"
                    }
                    alt={product.name || "Product image"}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.price || 0}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleModify(product.id)}
                  >
                    Modify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Button */}
      <div className="flex justify-center mt-4">
        <Link href="./products/addProduct">
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </Link>
      </div>
    </div>
  );
}
