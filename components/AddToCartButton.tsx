"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "./CartContext"

export default function AddToCartButton({ product }: any) {
  const { addItem } = useCart()

  return (
    <Button
      size="lg"
      variant="outline"
      onClick={() =>
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image_url: product.image_url,
          quantity: 1,
        })
      }
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  )
}