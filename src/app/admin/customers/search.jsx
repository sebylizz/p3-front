"use client";

import React from "react";
import { SfInput } from "@storefront-ui/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ onSearchChange }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term.trim()) {
      params.set("query", term.trim());
    } else {
      params.delete("query");
    }

    router.replace(`${pathName}?${params.toString()}`); // Update the URL

    if (onSearchChange) {
      onSearchChange(term.trim()); // Notify parent of query change
    }
  },500);

  return (
    <SfInput
      type="search"
      placeholder="Search for customers"
      aria-label="Search"
      onChange={(e) => handleSearch(e.target.value)}
      wrapperClassName="w-full"
      style={{
        padding: "0.5rem", // Padding for the search input
        maxWidth: "100%", // Allow full use of available space in the container
      }}
      defaultValue={searchParams.get("query") || ""}
    />
  );
}
