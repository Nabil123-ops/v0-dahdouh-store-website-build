"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/CartContext"
import ColorSelector from "./ColorSelector"

export default function AddToCartWithColor({ product }: any) {
  const { addItem } = useCart()
  const [selectedColor, setSelectedColor] = useState<any>(null)

  const handleAdd = () => {
    if (!selectedColor) return alert("Please select a color")

    addItem({
      id: product.id + "-" + selectedColor.name,
      name: `${product.name} (${selectedColor.name})`,
      price: product.price,
      image_url: product.image_url,
      quantity: 1,
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