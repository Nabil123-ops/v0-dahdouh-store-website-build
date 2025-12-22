"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default function ProductGallery({
  images,
  featured,
  discount,
}: {
  images: string[]
  featured: boolean
  discount: number
}) {
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Image
          src={images[active]}
          alt="Product image"
          fill
          className="object-cover"
        />

        {featured && (
          <Badge className="absolute left-4 top-4">Featured</Badge>
        )}

        {discount > 0 && (
          <Badge className="absolute right-4 top-4 bg-destructive">
            {discount}% OFF
          </Badge>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button key={i} onClick={() => setActive(i)}>
              <img
                src={img}
                className={`h-16 w-16 rounded object-cover border ${
                  active === i ? "border-primary" : "border-transparent"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}