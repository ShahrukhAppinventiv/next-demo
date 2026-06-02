"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { fetchRecipes } from "../../services/action";
import { resetRecipeList } from "../../services/slice";

export const useRecipeListHelper = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasShownSignInToast = useRef(false);

  const searchQuery = useAppSelector((state) => state.recipeSlice.search);
  const recipeList = useAppSelector((state) => state.recipeSlice.list);
  const loading = useAppSelector((state) => state.recipeSlice.loading);

//   useEffect(() => {
//     const signInStatus = searchParams.get("signin");

//     if (signInStatus !== "success" || hasShownSignInToast.current) return;

//     hasShownSignInToast.current = true;
//     toast.success("Sign in successfully");
//     router.replace("/products", { scroll: false });
//   }, [router, searchParams]);

  useEffect(() => {
    dispatch(
      fetchRecipes({
        limit: 90,
        ...(searchQuery ? { q: searchQuery } : {}),
      }),
    );
  }, [dispatch, searchQuery]);

  useEffect(() => {
    return () => {
      dispatch(resetRecipeList());
    };
  }, [dispatch]);

  return {
    dispatch,
    searchQuery,
    recipeList,
    loading,
  };
};
