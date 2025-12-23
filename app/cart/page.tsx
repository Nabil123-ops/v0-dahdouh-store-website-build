"use client"
import { useCart } from "@/components/CartContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CartPage() {
  const { cart, removeFromCart } = useCart()
  const total = cart.reduce((sum: number, item: any) => sum + item.price, 0)

  if (cart.length === 0)
    return <p className="text-center py-20">Your cart is empty 😔</p>

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.id} className="flex justify-between items-center border-b pb-3">
            <span>{item.name}</span>
            <span>${item.price}</span>
            <Button size="sm" variant="destructive" onClick={() => removeFromCart(item.id)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <h2 className="text-2xl font-semibold">Total: ${total.toFixed(2)}</h2>
        <Link href="/checkout">
          <Button size="lg">Checkout</Button>
        </Link>
      </div>
    </div>
  )
}