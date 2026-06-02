import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { resetProductDetails } from "../../services/slice";
import { getProductDetails } from "../../services/action";
import { addItem } from "@/app/store/slices/cart-slice/cartSlice";

export const useProductDetailsHelper = () => {
  const params = useParams();
  const id = Number(params.id);

  const dispatch = useAppDispatch();

  const product = useAppSelector(
    (state) => state.productSlice.details
  );

  const loading = useAppSelector(
    (state) => state.productSlice.detailsLoading
  );

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    dispatch(getProductDetails({ id }));

    return () => {
      dispatch(resetProductDetails());
    };
  }, [dispatch, id]);

  const originalPrice = product
    ? product.price / (1 - product.discountPercentage / 100)
    : 0;

  const ratingStars = product
    ? Math.round(product.rating)
    : 0;

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      dispatch(
        addItem({
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.thumbnail,
        })
      );
    }
  };

  return {
    product,
    loading,
    originalPrice,
    ratingStars,
    quantity,
    setQuantity,
    isWishlisted,
    setIsWishlisted,
    handleAddToCart,
  };
};
