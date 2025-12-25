"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

type Order = {
  customer: {
    name: string
    phone: string
    address: string
  }
  items: {
    id: string
    name: string
    price: number
    quantity: number
    image_url?: string
  }[]
  total: number
  notes?: string
  createdAt: string
}

export default function OrderReceiptPage() {
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("last_order")
    if (saved) {
      setOrder(JSON.parse(saved))
    }
  }, [])

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">
          No order found.
        </p>
        <Link href="/">
          <Button className="mt-6">Back to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-serif font-bold mb-6">
        Order Receipt 🧾
      </h1>

      {/* CUSTOMER INFO */}
      <div className="mb-6 rounded-lg border bg-card p-6">
        <p><strong>Name:</strong> {order.customer.name}</p>
        <p><strong>Phone:</strong> {order.customer.phone}</p>
        <p><strong>Address:</strong> {order.customer.address}</p>

        {order.notes && (
          <p className="mt-3 text-sm text-muted-foreground">
            <strong>Notes:</strong> {order.notes}
          </p>
        )}

        <p className="mt-3 text-xs text-muted-foreground">
          Order date: {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      {/* ITEMS */}
      <div className="rounded-lg border bg-card p-6 space-y-6">
        {order.items.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-4 border-b pb-4 last:border-0"
          >
            {item.image_url && (
              <Image
                src={item.image_url}
                alt={item.name}
                width={70}
                height={70}
                className="rounded-md object-cover"
              />
            )}

            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                Quantity: {item.quantity}
              </p>
            </div>

            <p className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}

        <div className="flex justify-between text-lg font-bold pt-4">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-8 flex flex-col gap-3">
        <Link href="/">
          <Button className="w-full">
            Back to Home
          </Button>
        </Link>

        <a
          href="https://wa.me/447377279370"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" className="w-full">
            Contact Support
          </Button>
        </a>
      </div>

      <p className="mt-6 text-xs text-muted-foreground text-center">
        Thank you for shopping with SmartShop 💙
      </p>
    </div>
  )
}