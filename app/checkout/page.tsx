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
  const [notes, setNotes] = useState("")

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleSubmit = () => {
    const orderText = `
🧾 New Order – SmartShop

👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${address}

🛒 Items:
${items.map(i => `• ${i.name} × ${i.quantity} — $${i.price}`).join("\n")}

📝 Notes:
${notes || "No size / color / RAM / storage selected"}

💰 Total: $${total.toFixed(2)}
    `.trim()

    localStorage.setItem(
      "last_order",
      JSON.stringify({
        customer: { name, phone, address },
        notes,
        items,
        total,
        createdAt: new Date().toISOString(),
      })
    )

    window.open(
      `https://wa.me/447377279370?text=${encodeURIComponent(orderText)}`,
      "_blank"
    )

    setTimeout(() => {
      clear()
      window.location.href = "/order-confirmed"
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto max-w-6xl px-4 py-14">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight">
            Secure Checkout
          </h1>
          <p className="mt-2 text-muted-foreground">
            Complete your order safely — Cash on Delivery
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* LEFT — CUSTOMER FORM */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border bg-card p-8 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">
                Shipping Information
              </h2>

              <div className="grid gap-5">
                <input
                  className="w-full rounded-xl border px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />

                <input
                  className="w-full rounded-xl border px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />

                <textarea
                  className="w-full rounded-xl border px-5 py-4 text-sm min-h-[120px] outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Full Address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />

                {/* OPTIONAL NOTES */}
                <textarea
                  className="w-full rounded-xl border px-5 py-4 text-sm min-h-[150px] outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder={`Order notes (optional)

• Size: S / M / L / XL / XXL / XXXL
• Color: White / Black / Red / Blue / Cyan
• RAM: 2GB / 4GB / 6GB / 8GB / 12GB / 16GB
• Storage: 16GB / 32GB / 64GB / 128GB / 256GB / 512GB / 1TB

Leave empty if not needed.`}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* RIGHT — ORDER SUMMARY */}
          <div className="rounded-2xl border bg-card p-8 shadow-sm h-fit">
            <h2 className="mb-6 text-xl font-semibold">
              Order Summary
            </h2>

            <div className="space-y-5">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-4"
                >
                  {item.image_url && (
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-xl object-cover"
                    />
                  )}

                  <div className="flex-1">
                    <p className="font-medium leading-tight">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t pt-6 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Button
              className="mt-8 h-14 w-full text-lg font-semibold"
              onClick={handleSubmit}
              disabled={!name || !phone || !address || items.length === 0}
            >
              Place Order via WhatsApp
            </Button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Cash on Delivery • No online payment required
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}