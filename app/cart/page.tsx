"use client"

import { useCart } from "@/components/CartContext"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"

export default function CartPage() {
  const {
    items,
    removeItem,
    increaseQty,
    decreaseQty,
  } = useCart()

  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  )

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <h1 className="mb-8 text-3xl font-serif font-bold">
        Shopping Cart 🛒
      </h1>

      {items.length === 0 && (
        <div className="rounded-lg border p-10 text-center">
          <p className="text-lg text-muted-foreground">
            Your cart is empty
          </p>
        </div>
      )}

      {items.length > 0 && (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT — CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            {items.map(item => (
              <div
                key={item.id}
                className="flex gap-4 rounded-lg border bg-card p-4"
              >
                {/* IMAGE */}
                {item.image_url && (
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    width={90}
                    height={90}
                    className="rounded-md object-cover"
                  />
                )}

                {/* INFO */}
                <div className="flex-1">
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-1">
                    ${item.price.toFixed(2)} each
                  </p>

                  {/* REAL QUANTITY CONTROLS */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-md border px-3 py-1">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="font-medium w-6 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>

                {/* ITEM TOTAL */}
                <div className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — ORDER SUMMARY */}
          <div className="rounded-lg border bg-card p-6 h-fit">
            <h2 className="mb-4 text-xl font-semibold">
              Order Summary
            </h2>

            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Delivery</span>
              <span>Cash on Delivery</span>
            </div>

            <div className="border-t mt-4 pt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link href="/checkout">
              <Button className="mt-6 w-full h-12 text-lg">
                Proceed to Checkout
              </Button>
            </Link>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Secure checkout • No online payment required
            </p>
          </div>
        </div>
      )}
    </div>
  )
}