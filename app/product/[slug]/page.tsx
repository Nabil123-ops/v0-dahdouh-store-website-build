import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, ShoppingCart, Package, Shield } from "lucide-react"
import { notFound } from "next/navigation"
import Image from "next/image"
export default async function ProductPage({
params,
}: {
params: Promise<{ slug: string }>
}) {
const { slug } = await params
const supabase = await createClient()
const { data: product } = await supabase
.from("products")
.select("*, categories(name, slug)")
.eq("slug", slug)
.eq("is_published", true)
.single()
if (!product) {
notFound()
}
const discount = product.original_price
? Math.round(((product.original_price - product.price) / product.original_price) * 100)
: 0
const whatsappMessage = `Hi! I'm interested in ${product.name} - $${product.price.toFixed(2)}`
const whatsappUrl = `https://wa.me/447377279370?text=${encodeURIComponent(whatsappMessage)}`
return (
<div className="flex min-h-screen flex-col">
<Header />
<main className="flex-1">  
    <div className="container mx-auto px-4 py-8">  
      <div className="grid gap-8 lg:grid-cols-2">  
        {/* Product Image */}  
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">  
          <Image  
            src={product.image_url || "/placeholder.svg"}  
            alt={product.name}  
            fill  
            className="object-cover"  
            priority  
          />  
          {product.is_featured && (  
            <Badge className="absolute left-4 top-4 bg-accent text-accent-foreground">Featured</Badge>  
          )}  
          {discount > 0 && (  
            <Badge className="absolute right-4 top-4 bg-destructive text-destructive-foreground">  
              {discount}% OFF  
            </Badge>  
          )}  
        </div>  
        {/* Product Info */}  
        <div className="flex flex-col gap-6">  
          {product.categories && (  
            <Badge variant="outline" className="w-fit">  
              {product.categories.name}  
            </Badge>  
          )}  
          <div>  
            <h1 className="mb-3 font-serif text-3xl font-bold leading-tight text-balance lg:text-4xl">  
              {product.name}  
            </h1>  
            <div className="flex items-center gap-3">  
              <span className="font-serif text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>  
              {product.original_price && (  
                <span className="text-xl text-muted-foreground line-through">  
                  ${product.original_price.toFixed(2)}  
                </span>  
              )}  
            </div>  
          </div>  
          {product.description && (  
            <div>  
              <h2 className="mb-2 font-semibold">Description</h2>  
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>  
            </div>  
          )}  
          <div className="flex items-center gap-2 text-sm">  
            <Package className="h-4 w-4 text-muted-foreground" />  
            <span className="text-muted-foreground">  
              {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : "Out of stock"}  
            </span>  
          </div>  
          <div className="flex flex-col gap-3">  
            <Button size="lg" className="w-full" asChild disabled={product.stock_quantity === 0}>  
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">  
                <Phone className="mr-2 h-5 w-5" />  
                Order via WhatsApp  
              </a>  
            </Button>  
            <Button  
              size="lg"  
              variant="outline"  
              className="w-full bg-transparent"  
              disabled={product.stock_quantity === 0}  
            >  
              <ShoppingCart className="mr-2 h-5 w-5" />  
              Add to Cart  
            </Button>  
          </div>  
          <Card>  
            <CardContent className="grid gap-4 p-6 sm:grid-cols-2">  
              <div className="flex items-start gap-3">  
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">  
                  <Shield className="h-5 w-5 text-primary" />  
                </div>  
                <div>  
                  <h3 className="font-semibold">Cash on Delivery</h3>  
                  <p className="text-sm text-muted-foreground">Pay when you receive</p>  
                </div>  
              </div>  
              <div className="flex items-start gap-3">  
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">  
                  <Package className="h-5 w-5 text-primary" />  
                </div>  
                <div>  
                  <h3 className="font-semibold">Fast Delivery</h3>  
                  <p className="text-sm text-muted-foreground">Quick shipping</p>  
                </div>  
              </div>  
            </CardContent>  
          </Card>  
        </div>  
      </div>  
    </div>  
  </main>  
  <Footer />  
</div>
)
}