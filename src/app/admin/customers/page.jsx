"use client";

import React, { useState, useEffect } from 'react';
import customerFetcher from '@/app/lib/getCustomers';
import deleteCustomer from '@/app/lib/DeleteCustomer'; 
import { useRouter } from "next/navigation";
import sanitizeInput from '@/app/sanitizeInput';

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const BATCH_SIZE = 10;

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await customerFetcher(offset, BATCH_SIZE);
      setCustomers((prev) => [...prev, ...data]);
      setOffset((prev) => prev + BATCH_SIZE);
    } catch (error) {
      console.error("Error loading customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSearchChange = (e) => {
    const sanitizedQuery = sanitizeInput(e.target.value);
    setSearchQuery(sanitizedQuery);
  };

  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer =>
    `${customer.name} ${customer.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id); // Call API to delete customer
      setCustomers((prev) => prev.filter((customer) => customer.id !== id)); // Remove from UI
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleModify = (id) => {
    router.push(`/customers/modify/${id}`); // Navigate to modify page for specific customer
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <div className="relative flex w-full max-w-md">
          <input
            type="search"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            placeholder="Search by name"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="my-2 mx-1 flex justify-center">
        <table className="table-auto border-collapse border border-gray-300">
          <thead className="bg-[#84B0CA] text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone Number</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td className="border border-gray-300 px-4 py-2">{customer.name}</td>
                <td className="border border-gray-300 px-4 py-2">{customer.lastName}</td>
                <td className="border border-gray-300 px-4 py-2">{customer.email}</td>
                <td className="border border-gray-300 px-4 py-2">{customer.phoneNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{customer.role}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleDelete(customer.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleModify(customer.id)}
                  >
                    Modify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={fetchCustomers}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}
