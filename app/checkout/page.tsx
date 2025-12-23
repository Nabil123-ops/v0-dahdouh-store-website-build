"use client"
import { useCart } from "@/components/CartContext"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const [form, setForm] = useState({ name: "", phone: "", address: "" })
  const total = cart.reduce((sum: number, i: any) => sum + i.price, 0)

  const handleSubmit = () => {
    const message = `
🛍 SmartShop Order
👤 Name: ${form.name}
📞 Phone: ${form.phone}
🏠 Address: ${form.address}

Items:
${cart.map(i => `• ${i.name} – $${i.price}`).join("\n")}
💰 Total: $${total}
`
    const whatsappUrl = `https://wa.me/447377279370?text=${encodeURIComponent(message)}`
    clearCart()
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="container mx-auto py-10 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <input
        placeholder="Full name"
        className="w-full border rounded-md p-2 mb-3"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Phone number"
        className="w-full border rounded-md p-2 mb-3"
        onChange={e => setForm({ ...form, phone: e.target.value })}
      />
      <textarea
        placeholder="Full address"
        className="w-full border rounded-md p-2 mb-3"
        onChange={e => setForm({ ...form, address: e.target.value })}
      />
      <Button size="lg" className="w-full" onClick={handleSubmit}>
        Confirm via WhatsApp
      </Button>
    </div>
  )
}