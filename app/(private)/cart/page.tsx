"use client"

import Image from "next/image"
import Link from "next/link"
import { Trash2, Minus, Plus } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/app/store/hooks"
import { removeItem, updateQuantity, clearCart } from "@/app/store/slices/cart-slice/cartSlice"
import Button from "@/app/components/button/Button"
import { Heart, ShoppingCart, Star } from "lucide-react";
import clsx from "clsx"

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const totalPrice = items.reduce((s, it) => s + it.price * it.quantity, 0);

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-semibold text-foreground">Shopping Cart</h1>
     
          <div className="flex flex-col items-center justify-center py-16">
            <ShoppingCart className={clsx("size-34")} />
            <p className="text-lg font-medium text-foreground">
              Your cart is empty
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Add some products to get started!
            </p>
            <Link href="/">
              <Button className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-foreground">Shopping Cart</h1>
          <Link href="/">
            <Button >Continue Shopping</Button>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-lg border border-border/50 bg-card p-4"
              >
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-secondary/50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="line-clamp-2 text-sm font-medium text-card-foreground">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-lg font-semibold text-accent">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                        }
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                        }
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-lg border border-border/50 bg-card p-6">
            <h2 className="text-lg font-semibold text-card-foreground">
              Order Summary
            </h2>

            <div className="mt-4 space-y-3 border-b border-border/30 pb-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm text-muted-foreground"
                >
                  <span className="line-clamp-1">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-medium text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">${totalPrice.toFixed(2)}</span>
              </div>
              {/* <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="text-foreground">
                  ${(totalPrice * 0.1).toFixed(2)}
                </span>
              </div> */}
            </div>

            {/* <div className="mt-4 border-t border-border/30 pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-accent">
                  ${(totalPrice * 1.1).toFixed(2)}
                </span>
              </div>
            </div> */}
{/* 
            <Button className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90">
              Proceed to Checkout
            </Button> */}

            <Button
              className="mt-2 w-full"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
