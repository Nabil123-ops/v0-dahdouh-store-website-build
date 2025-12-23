"use client"

import { useCart } from "@/components/CartContext"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function CheckoutPage() {
  const { items, clear } = useCart()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  const handleSubmit = () => {
    const order = `
🧾 New Order

👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${address}

🛒 Items:
${items.map(i => `• ${i.name} x${i.quantity} - $${i.price}`).join("\n")}

💰 Total: $${total.toFixed(2)}
`

    window.open(
      `https://wa.me/447377279370?text=${encodeURIComponent(order)}`,
      "_blank"
    )

    clear()
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Checkout 📦</h1>

      <input className="input" placeholder="Full Name" onChange={e => setName(e.target.value)} />
      <input className="input mt-3" placeholder="Phone Number" onChange={e => setPhone(e.target.value)} />
      <textarea className="input mt-3" placeholder="Address" onChange={e => setAddress(e.target.value)} />

      <Button className="mt-6 w-full" onClick={handleSubmit}>
        Confirm Order via WhatsApp
      </Button>
    </div>
  )
}