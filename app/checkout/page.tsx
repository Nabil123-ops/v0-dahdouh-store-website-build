"use client"

import { useCart } from "@/components/CartContext"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function CheckoutPage() {
  const { items, clear } = useCart()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleSubmit = () => {
    /* -----------------------------
       BUILD WHATSAPP MESSAGE
    ----------------------------- */
    const orderText = `
🧾 New Order – SmartShop

👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${address}

🛒 Items:
${items
  .map(i => `• ${i.name} × ${i.quantity} — $${i.price}`)
  .join("\n")}

💰 Total: $${total.toFixed(2)}
    `.trim()

    /* -----------------------------
       SAVE RECEIPT (FOR RECEIPT PAGE)
    ----------------------------- */
    localStorage.setItem(
      "last_order",
      JSON.stringify({
        customer: { name, phone, address },
        items,
        total,
        createdAt: new Date().toISOString(),
      })
    )

    /* -----------------------------
       OPEN WHATSAPP
    ----------------------------- */
    window.open(
      `https://wa.me/447377279370?text=${encodeURIComponent(orderText)}`,
      "_blank"
    )

    /* -----------------------------
       REDIRECT TO CONFIRMATION
    ----------------------------- */
    setTimeout(() => {
      clear()
      window.location.href = "/order-confirmed"
    }, 300)
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <h1 className="mb-8 text-3xl font-serif font-bold">
        Secure Checkout 🔒
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* LEFT — CUSTOMER INFO */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold">
              Shipping Information
            </h2>

            <div className="grid gap-4">
              <input
                className="w-full rounded-md border px-4 py-3"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />

              <input
                className="w-full rounded-md border px-4 py-3"
                placeholder="Phone Number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />

              <textarea
                className="w-full rounded-md border px-4 py-3 min-h-[120px]"
                placeholder="Full Address"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div className="rounded-lg border bg-card p-6 h-fit">
          <h2 className="mb-4 text-xl font-semibold">
            Order Summary
          </h2>

          <div className="space-y-4">
            {items.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-4"
              >
                {item.image_url && (
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                )}

                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Button
            className="mt-6 w-full h-12 text-lg"
            onClick={handleSubmit}
            disabled={!name || !phone || !address || items.length === 0}
          >
            Place Order via WhatsApp 💬
          </Button>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Cash on Delivery • No online payment required
          </p>
        </div>
      </div>
    </div>
  )
}