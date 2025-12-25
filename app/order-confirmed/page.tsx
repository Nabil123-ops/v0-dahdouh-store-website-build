"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function OrderConfirmedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-background flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl border bg-card shadow-xl p-8 text-center">
        {/* SUCCESS ICON */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle
            className="h-12 w-12 text-green-600"
            aria-hidden
          />
        </div>

        {/* TITLE */}
        <h1 className="mb-3 font-serif text-3xl font-bold">
          Order Sent Successfully 🎉
        </h1>

        {/* MESSAGE */}
        <p className="mb-8 text-muted-foreground leading-relaxed">
          Your order has been sent via WhatsApp.
          <br />
          Our team will contact you shortly to confirm delivery details.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-4">
          <Link href="/order-receipt">
            <Button className="w-full h-12 text-base font-medium">
              View Order Receipt
            </Button>
          </Link>

          <Link href="/">
            <Button
              variant="outline"
              className="w-full h-12"
            >
              Continue Shopping
            </Button>
          </Link>

          <a
            href="https://wa.me/447377279370"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              className="w-full"
            >
              Contact Support on WhatsApp
            </Button>
          </a>
        </div>

        {/* TRUST FOOTER */}
        <div className="mt-8 border-t pt-4">
          <p className="text-xs text-muted-foreground">
            Cash on Delivery • Fast Shipping • Secure Order
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            © SmartShop
          </p>
        </div>
      </div>
    </div>
  )
}