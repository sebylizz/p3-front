"use client";

import React, { useState, useEffect } from "react";
import allProducts from "@/app/lib/getAllProducts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import sanitizeInput from "@/app/lib/sanitizeInput";
import { SfLoaderCircular } from "@storefront-ui/react";
import truncateToTwoDecimals from "@/app/lib/truncateToTwoDecimals";
import { SfButton, SfIconAdd } from "@storefront-ui/react";
import Search from "../customers/search";
import { parse } from "path";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const data = await allProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    router.refresh();
  }, [router]);
  
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
      {/* Search and Add Button */}
      <div className="flex justify-between items-center mt-4 mb-4 px-4">
        <Search
          placeholder="Search For Products"
          onSearchChange={(term) => setSearchQuery(sanitizeInput(term))}
        />
        <Link href={"./products/addProduct"}>
          <SfButton
            variant="primary"
            className="flex items-center justify-center"
            style={{
              padding: "0.5rem",
            }}
          >
            <SfIconAdd className="text-white" />
          </SfButton>
        </Link>
      </div>

      {/* Products Table */}
      <div className="my-2 mx-1 flex justify-center">
        <div className="w-full">
          <div
            className="flex border-b border-gray-300 text-black font-bold"
            style={{ backgroundColor: "#fb923c" }} 
            >
            <div
              className="px-4 py-2 text-sm text-center hidden md:block"
              style={{ flex: 1 }}
            >
              Image
            </div>
            <div className="px-4 py-2 text-sm text-center" style={{ flex: 1 }}>
              {window.innerWidth > 768 ? "ID" : "Name"}
            </div>
            <div
              className="px-4 py-2 text-sm text-center hidden md:block"
              style={{ flex: 1 }}
            >
              Price
            </div>
            <div className="px-4 py-2 text-sm text-center" style={{ flex: 1 }}>
              Actions
            </div>
          </div>

          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center border-b border-gray-300"
            >
              {/* Image */}
              <div
                className="px-4 py-2 flex justify-center items-center hidden md:block"
                style={{ flex: 1 }}
              >
                {product.colors && product.colors.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100px",
                    }}
                  >
                    <img
                      src={`/${product.id}/${product.colors[0].id}/${product.colors[0].mainImage}`}
                      alt={product.name}
                      className="object-cover"
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100px",
                    }}
                  >
                    <span>No Image</span>
                  </div>
                )}
              </div>

              {/* ID or Name */}
              <div
                className="px-4 py-2 text-sm text-center truncate"
                style={{ flex: 1 }}
              >
                {product.name}
              </div>

              {/* Price */}
              <div
                className="px-4 py-2 text-sm text-center truncate hidden md:block"
                style={{ flex: 1 }}
              >
                {parseFloat(product.price / 1000)} kr
              </div>

              {/* Actions */}
              <div
                className="flex justify-center items-center px-4 py-2 text-center"
                style={{ flex: 1 }}
              >
                <button
                  type="button"
                  onClick={() => handleModify(product.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full md:w-auto"
                >
                  Modify
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
