"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  status,
  redirectPath, 
}) {
  const router = useRouter(); 

  if (!isOpen && !status) return null;

  let statusMessage = "";
  let statusClass = "";

  if (status === "success") {
    statusMessage = "Product added successfully!";
    statusClass = "text-green-600";
  } else if (status === "failure") {
    statusMessage = "Failed to add the product. Please try again.";
    statusClass = "text-red-600";
  }

  const handleRedirect = () => {
    if (redirectPath) {
      router.push(redirectPath); 
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3 text-center">
        {status ? (
          <p className={`mb-6 font-bold ${statusClass}`}>{statusMessage}</p>
        ) : (
          <p className="mb-6">{message}</p>
        )}

        <div className="flex flex-col md:flex-row justify-center gap-4">
          {!status && (
            <>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#0d7f3f] text-white rounded hover:bg-[#0a6531]"
                onClick={onConfirm}
              >
                Confirm
              </button>
            </>
          )}

          {status && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => {
                onClose(); 
                handleRedirect(); 
              }}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
