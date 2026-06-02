"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
// import { resetProductList } from "@/app/store/slices/product-slice/productSlice";
// import { getProductList } from "@/app/store/slices/product-slice/action";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { getProductList } from "../../services/action";
import { resetProductList } from "../../services/slice";

export const useProductListHelper = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasShownSignInToast = useRef(false);

  const searchQuery = useAppSelector((state) => state.productSlice.search);
  const productList = useAppSelector((state) => state.productSlice.productList);
  const loading = useAppSelector((state) => state.productSlice.loading);

  useEffect(() => {
    const signInStatus = searchParams.get("signin");

    if (signInStatus !== "success" || hasShownSignInToast.current) return;

    hasShownSignInToast.current = true;
    toast.success("Sign in successfully");
    router.replace("/products", { scroll: false });
  }, [router, searchParams]);

  useEffect(() => {
    dispatch(
      getProductList({
        limit: 60,
        ...(searchQuery ? { q: searchQuery } : {}),
      }),
    );
  }, [dispatch, searchQuery]);

  useEffect(() => {
    return () => {
      dispatch(resetProductList());
    };
  }, [dispatch]);

  return {
    dispatch,
    searchQuery,
    productList,
    loading,
  };
};
