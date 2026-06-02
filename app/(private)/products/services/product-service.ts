import { API_BASE_URL } from "@/app/lib/api";

export async function getProducts(query?: string) {
  console.log("🟠 SERVICE - getProducts called with query:", query);
  const url = query
    ? `${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`
    : `${API_BASE_URL}/products`;
  console.log("🟠 SERVICE - API URL:", url);

  const cacheConfig = query
    ? { cache: "no-store" as const }  // Always fresh on search
    : { next: { revalidate: 60 } };   // Cache for 60s on initial load

  const res = await fetch(url, cacheConfig);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  console.log("📦 Products API Response:", { query, url, dataCount: data.products?.length, data });
  return data;
}

export async function getProductById(id: string) {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    cache: "no-store", // always fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}