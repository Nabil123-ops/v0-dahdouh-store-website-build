import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  imageUrl: string
  isFeatured?: boolean
}

export function ProductCard({ id, name, slug, price, originalPrice, imageUrl, isFeatured }: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <Link href={`/product/${encodeURIComponent(slug)}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {isFeatured && <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">Featured</Badge>}
            {discount > 0 && (
              <Badge className="absolute right-3 top-3 bg-destructive text-destructive-foreground">
                {discount}% OFF
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <h3 className="line-clamp-2 text-sm font-medium leading-tight group-hover:text-primary">{name}</h3>
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
