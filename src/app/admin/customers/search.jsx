"use client";

import React from "react";
import { SfInput } from "@storefront-ui/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ onSearchChange, placeholder = "Search"  }) {
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
    router.replace(`${pathName}?${params.toString()}`); 
    if (onSearchChange) {
      onSearchChange(term.trim()); 
    }
  }, 500);

  return (
    <SfInput
      type="search"
      placeholder={placeholder}
      aria-label="Search"
      onChange={(e) => handleSearch(e.target.value)}
      wrapperClassName="w-full"
      style={{
        padding: "0.5rem", 
        maxWidth: "100%", 
      }}
      defaultValue={searchParams.get("query") || ""}
    />
  );
}
