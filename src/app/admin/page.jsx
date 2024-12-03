"use client";

import React from "react";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link href="/admin/products">
          <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-blue-100 transition duration-200 cursor-pointer">
            <div className="flex items-center space-x-4">
              <span className="text-blue-500 text-4xl">📦</span>
              <div>
                <h2 className="text-xl font-bold text-gray-700">Products</h2>
                <p className="text-sm text-gray-500">
                  Manage and update product listings.
                </p>
              </div>
            </div>
          </div>
        </Link>


        <Link href="/admin/customers">
          <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-green-100 transition duration-200 cursor-pointer">
            <div className="flex items-center space-x-4">
              <span className="text-green-500 text-4xl">👥</span>
              <div>
                <h2 className="text-xl font-bold text-gray-700">Customers</h2>
                <p className="text-sm text-gray-500">
                  View and manage customer details.
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
