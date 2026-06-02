"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SearchBar } from "./Search";

interface ProductSearchProps {
  initialValue?: string;
}

export function ProductSearch({
  initialValue = "",
}: ProductSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (value: string) => {
    console.log("🔵 SEARCH - Input value:", value);
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    const newUrl = `/products?${params.toString()}`;
    console.log("🔵 SEARCH - New URL:", newUrl);
    router.replace(newUrl);
  };

  return (
    <SearchBar
      value={initialValue}
      onChange={handleSearch}
      placeholder="Search products..."
    />
  );
}