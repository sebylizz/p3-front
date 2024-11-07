"use client";

import React, { useState, useEffect } from 'react';
import { SfSelect } from '@storefront-ui/react';
import productFetcherJSX from '@/app/lib/GetProducts';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import HandleDelete from '@/app/lib/DeleteProduct';
import sortProducts from '@/app/sortProducts';
import sanitizeInput from '@/app/sanitizeInput';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('relevance'); 
  const router = useRouter();

  const fetchProducts = async () => {
    const data = await productFetcherJSX();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle sorting option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedProducts = sortProducts(products, sortOption);


  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    const newCheckedItems = products.reduce((acc, product) => {
      acc[product.id] = isChecked;
      return acc;
    }, {});
    setCheckedItems(newCheckedItems);
    setSelectAll(isChecked);
  };
  const handleBulkDelete = async () => {
    const idsToDelete = Object.keys(checkedItems).filter(id => checkedItems[id]);
  
    if (idsToDelete.length === 0) {
      console.log('No products selected for deletion.');
      return; 
    }
    try {
      await HandleDelete(idsToDelete);
  
      console.log('Products deleted successfully.');
      setCheckedItems({}); 
      setSelectAll(false); 
      fetchProducts(); 
    } catch (error) {
      console.error('Error while deleting products:', error);
    }
  };
  
  const individualDeletion = async (idToDelete) => {
    const idsToDelete = [idToDelete]; // Wrap the single ID in an array
  
    if (idsToDelete.length === 0) {
      console.log('No products selected for deletion.');
      return; 
    }
  
    try {
      await HandleDelete(idsToDelete); // Pass the array of one ID
      fetchProducts(); // Refresh the product list after deletion
    } catch (error) {
      console.error('Error while deleting product:', error);
    }
  };
  
  const handleModify = (id) => {
    router.push(`products/modifyProduct/${id}`);
  };

  const handleSearchChange = (e) => {
    const sanitizedQuery = sanitizeInput(e.target.value);
    setSearchQuery(sanitizedQuery);
  };

  const filteredProducts = sortedProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortingOptions = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Price: Low to High', value: 'price low to high' },
    { label: 'Price: High to Low', value: 'price high to low' },
    { label: 'Quantity: High to Low', value: 'quantity high to low' },
    { label: 'Name', value: 'name' },
    { label: 'Quantity: Low to High', value: 'quantity low to high' },
  ];

  // Determine if any checkboxes are selected
  const anySelected = Object.values(checkedItems).some(Boolean);

  return (
    <div>
      {/* Sorting Filter */}
      <div className="w-full md:max-w-[376px] mx-auto mb-4">
        <h6 className="bg-neutral-100 mb-4 px-4 py-2 rounded uppercase typography-headline-6 font-bold tracking-widest">
          Sort by
        </h6>
        <div className="px-4">
        <label htmlFor="sortOptions">Sort by</label>
        <select
          id="sortOptions"
          aria-label="Sort by"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="relevance">Relevance</option>
          <option value="price low to high">Price: Low to High</option>
          <option value="price high to low">Price: High to Low</option>
          <option value="quantity high to low">Quantity: High to Low</option>
          <option value="name">Name</option>
          <option value="quantity low to high">Quantity: Low to High</option>
        </select>

        </div>
      </div>

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
              <th className="border border-gray-300 px-4 py-2">
                <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} />
              </th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="checkbox"
                    checked={checkedItems[product.id] || false}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => individualDeletion(product.id)}
                  >
                    Delete
                  </button>
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
      {/* Conditional Delete Button */}
      {anySelected && ( 
        <div className="flex justify-center mt-4">
          <button 
            className="bg-red-600 text-white px-4 py-2 rounded" 
            onClick={handleBulkDelete} 
          >
            Delete Selected
          </button>
        </div>
      )}


      {/* Add Product Button */}
      <div className="flex justify-center mt-4">
        <Link href="./products/addProduct">
          <button className="bg-green-500 text-white px-4 py-2 rounded">Add Product</button>
        </Link>
      </div>
    </div>
  );
}
