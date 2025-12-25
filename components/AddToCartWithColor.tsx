"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/CartContext"
import ColorSelector from "@/components/ColorSelector"

type Color = {
  name: string
  hex: string
}

export default function AddToCartWithColor({ product }: { product: any }) {
  const { addItem } = useCart()

  const colors: Color[] = Array.isArray(product.colors) ? product.colors : []
  const [selectedColor, setSelectedColor] = useState<Color | null>(null)
  const [qty, setQty] = useState(1)

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: selectedColor
        ? `${product.name} (${selectedColor.name})`
        : product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: qty,
    })
  }

  return (
    <div className="space-y-4">
      {/* Color selection */}
      <ColorSelector
        colors={colors}
        selected={selectedColor?.name || null}
        onSelect={setSelectedColor}
      />

      {/* Quantity selector */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setQty(Math.max(1, qty - 1))}
        >
          –
        </Button>
        <span className="text-lg font-medium">{qty}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setQty(qty + 1)}
        >
          +
        </Button>
      </div>

      {/* Add to cart */}
      <Button
        size="lg"
        className="w-full"
        onClick={handleAdd}
        disabled={!selectedColor}
      >
        Add to Cart
      </Button>
    </div>
  )
}
