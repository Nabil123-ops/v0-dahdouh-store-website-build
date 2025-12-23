"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function OrderConfirmedPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-lg text-center">
      <CheckCircle className="mx-auto h-20 w-20 text-green-500 mb-6" />

      <h1 className="text-3xl font-serif font-bold mb-4">
        Order Sent Successfully 🎉
      </h1>

      <p className="text-muted-foreground mb-8">
        Your order has been sent via WhatsApp.
        Our team will contact you shortly to confirm delivery details.
      </p>

      <div className="flex flex-col gap-4">
        <Link href="/order-receipt">
          <Button className="w-full">
            View Order Receipt
          </Button>
        </Link>

        <Link href="/">
          <Button variant="outline" className="w-full">
            Continue Shopping
          </Button>
        </Link>

        <a
          href="https://wa.me/447377279370"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost" className="w-full">
            Contact Support on WhatsApp
          </Button>
        </a>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Cash on Delivery • Fast Shipping • SmartShop
      </p>
    </div>
  )
}