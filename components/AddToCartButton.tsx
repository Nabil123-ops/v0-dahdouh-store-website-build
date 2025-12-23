"use client"

import { useState } from "react"
import { ShoppingCart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/CartContext"

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)

  const increase = () => setQty(q => q + 1)
  const decrease = () => setQty(q => (q > 1 ? q - 1 : 1))

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: qty,
    })
  }

  return (
    <div className="flex flex-col gap-3">
      {/* QUANTITY SELECTOR */}
      <div className="flex items-center justify-between border rounded-lg px-4 py-2">
        <span className="text-sm font-medium">Quantity</span>

        <div className="flex items-center gap-3">
          <button onClick={decrease} className="p-1">
            <Minus size={18} />
          </button>

          <span className="w-6 text-center font-semibold">{qty}</span>

          <button onClick={increase} className="p-1">
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* ADD TO CART */}
      <Button
        size="lg"
        variant="outline"
        onClick={handleAdd}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
    </div>
  )
}