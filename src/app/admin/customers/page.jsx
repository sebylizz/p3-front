"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import customerFetcher from "@/app/lib/getCustomers";
import deleteCustomerAdmin from "@/app/lib/deleteCustomer";
import getSearch from "@/app/lib/getSearchCustomers";
import { SfButton, SfIconAdd } from "@storefront-ui/react";
import Search from "./search";
import Link from "next/link";
import PasswordModal from "@/app/components/admin/PasswordModal";
import ConfirmationModal from "@/app/components/admin/ConfirmationModal";
import handlePasswordConfirmation from "@/app/lib/handleConfirmPassword";

function CustomerContent({ searchParams }) {
  const [customers, setCustomers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const BATCH_SIZE = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const fetchCustomers = async (query, reset = false) => {
    if (loading) return;
    setLoading(true);

    try {
      if (reset) {
        setCustomers([]);
        setOffset(0);
        setHasMore(true);
        setTotal(0);
      }

      const currentOffset = reset ? 0 : offset;

      if (!query.trim()) {
        const { customers: newCustomers, total: newTotal } =
          await customerFetcher(currentOffset, BATCH_SIZE);
        setCustomers((prev) =>
          reset ? newCustomers : [...prev, ...newCustomers]
        );
        setTotal(newTotal);
        setHasMore(currentOffset + BATCH_SIZE < newTotal);
      } else {
        const { customers: newCustomers, total: newTotal } = await getSearch(
          query,
          currentOffset,
          BATCH_SIZE
        );
        setCustomers((prev) =>
          reset ? newCustomers : [...prev, ...newCustomers]
        );
        setTotal(newTotal);
        setHasMore(currentOffset + BATCH_SIZE < newTotal);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const query = searchParams.get("query") || "";
    fetchCustomers(query, true);
  }, [searchParams]);

  const handleLoadMore = () => {
    setOffset((prev) => prev + BATCH_SIZE);
  };

  useEffect(() => {
    if (offset > 0) {
      const query = searchParams.get("query") || "";
      fetchCustomers(query);
    }
  }, [offset]);

  const confirmDelete = (customer) => {
    setCurrentCustomer(customer);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (currentCustomer?.role === "admin") {
      setIsPasswordModalOpen(true);
      setIsModalOpen(false);
    } else if (currentCustomer) {
      handleDelete(currentCustomer.id);
      setIsModalOpen(false);
    }
  };

  const handleDeleteCustomer = async (password) => {
    try {
      setIsPasswordModalOpen(false);
      await handlePasswordConfirmation({
        password,
        action: async () => {
          await deleteCustomerAdmin(currentCustomer.id);
          setCustomers((prev) =>
            prev.filter((customer) => customer.id !== currentCustomer.id)
          );
        },
        successMessage: "Customer deleted successfully.",
      });
    } catch (error) {
      console.error("Error during customer deletion:", error);
    }
  };

  return (
    <div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message={
          <>
            You are deleting the user:{" "}
            <strong>{currentCustomer?.firstName}</strong>{" "}
            <strong>{currentCustomer?.lastName}</strong>. <br />
            Are you sure?
          </>
        }
      />

      <div className="flex justify-center items-center mt-4 mb-4">
        <div
          className="flex items-center gap-2"
          style={{ width: "50%", padding: "0.5rem" }}
        >
          <Search placeholder="Search For Customers" />
          <Link href={"./customers/addCustomer"}>
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
      </div>

      <div className="my-2 mx-1 flex justify-center">
        <div className="w-full">
          <div
            className="flex border-b border-gray-300 text-black font-bold"
            style={{ backgroundColor: "#fb923c" }} 
            >
            <div className="px-4 py-2 text-sm text-center" style={{ flex: 1 }}>
              ID
            </div>
            <div
              className="px-4 py-2 text-sm text-center hidden md:block"
              style={{ flex: 1 }}
            >
              Name
            </div>
            <div
              className="px-4 py-2 text-sm text-center hidden md:block"
              style={{ flex: 1 }}
            >
              Last Name
            </div>
            <div className="px-4 py-2 text-sm text-center" style={{ flex: 1 }}>
              Email
            </div>
            <div className="px-4 py-2 text-sm text-center" style={{ flex: 1 }}>
              Role
            </div>
            <div className="px-4 py-2 text-sm text-center" style={{ flex: 1 }}>
              Actions
            </div>
          </div>

          {customers.map((customer) => (
            <div
              key={customer.id}
              className="flex items-center border-b border-gray-300"
            >
              <div className="px-4 py-2 text-sm truncate" style={{ flex: 1 }}>
                {customer.id}
              </div>
              <div
                className="px-4 py-2 text-sm truncate hidden md:block"
                style={{ flex: 1 }}
              >
                {customer.firstName}
              </div>
              <div
                className="px-4 py-2 text-sm truncate hidden md:block"
                style={{ flex: 1 }}
              >
                {customer.lastName}
              </div>
              <div className="px-4 py-2 text-sm truncate" style={{ flex: 1 }}>
                {customer.email}
              </div>
              <div className="px-4 py-2 text-sm truncate" style={{ flex: 1 }}>
                {customer.role}
              </div>
              <div
                className="flex flex-col md:flex-row gap-2 px-4 py-2"
                style={{ flex: 1 }}
              >
                <button
                  type="button"
                  onClick={() => confirmDelete(customer)}
                  className={`${
                    customer.id === 0
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-700"
                  } text-white px-4 py-2 rounded-md w-full md:w-auto`}
                  disabled={customer.id === 0}
                >
                  Delete
                </button>
                <Link
                  href={`./customers/modifyCustomer/${customer.id}`}
                  className={customer.id === 0 ? "pointer-events-none" : ""}
                >
                  <button
                    type="button"
                    className={`${
                      customer.id === 0
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-700"
                    } text-white px-4 py-2 rounded-md w-full md:w-auto`}
                    disabled={customer.id === 0}
                  >
                    Modify
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleLoadMore}
          disabled={loading || !hasMore}
          className={`px-4 py-2 rounded text-white ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : hasMore
              ? "bg-blue-700 hover:bg-blue-900"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onConfirm={handleDeleteCustomer}
        message="Please confirm your password to delete the user."
      />
    </div>
  );
}

export default function CustomerPage() {
  const searchParams = useSearchParams();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomerContent searchParams={searchParams} />
    </Suspense>
  );
}
