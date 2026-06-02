"use client";

import { ProductCard } from "@/app/components/product-card";
import { SearchBar } from "@/app/components/search/Search";
import ProductListingLoading from "../../loading";
import { Product } from "../../services/types";
import { useProductListHelper } from "./helper";
import { setSearchQuery } from "../../services/slice";

const ProductList = () => {
    const { dispatch, searchQuery, productList, loading } = useProductListHelper();

    return (
        <main className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">


            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <SearchBar
                        value={searchQuery}
                        onChange={(value) => {
                            dispatch(setSearchQuery(value));
                        }}
                    />
                </div>
                {loading ? (
                    <ProductListingLoading />
                ) : (
                    <div>

                        {productList && productList.length === 0 ? (
                            <div className="mx-auto max-w-xl rounded-lg   bg-card p-8 text-center">
                                <div className="mx-auto mb-4 w-24 text-muted-foreground">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-24 h-24 mx-auto">
                                        <circle cx="11" cy="11" r="6" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-semibold text-foreground">No products match your search</h2>
                                <p className="mt-2 text-sm text-muted-foreground">Try a different keyword or clear your search to see all products.</p>

                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {productList &&
                                    productList?.map((product: Product) => (
                                        <ProductCard key={product.id ?? product.title} {...product} />
                                    ))}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </main>
    )
}

export default ProductList
