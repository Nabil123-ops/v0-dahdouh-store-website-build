"use client"

import { useCart } from "@/components/CartContext"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const { items, removeItem } = useCart()

  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  )

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart 🛒</h1>

      {items.length === 0 && <p>Your cart is empty</p>}

      {items.map(item => (
        <div key={item.id} className="flex justify-between mb-4">
          <span>{item.name} × {item.quantity}</span>
          <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>
            Remove
          </Button>
        </div>
      ))}

      <p className="font-bold mt-4">Total: ${total.toFixed(2)}</p>

      <Link href="/checkout">
        <Button className="mt-6 w-full">Proceed to Checkout</Button>
      </Link>
    </div>
  )
}