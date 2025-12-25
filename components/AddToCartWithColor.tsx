"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/CartContext"

type Color = {
  name: string
  hex: string
}

export default function AddToCartWithColor({
  product,
}: {
  product: any
}) {
  const { addItem } = useCart()

  // ✅ SAFETY: ensure colors is an array
  const colors: Color[] = Array.isArray(product.colors)
    ? product.colors
    : []

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
      <ColorSelector
        colors={product.colors}
        selected={selectedColor?.name || null}
        onSelect={setSelectedColor}
      />

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