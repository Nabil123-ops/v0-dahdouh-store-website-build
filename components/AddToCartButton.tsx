"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/CartContext"

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart()

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: 1,
    })
  }

  return (
    <Button
      type="button"
      size="lg"
      variant="outline"
      onClick={handleAdd}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  )
}