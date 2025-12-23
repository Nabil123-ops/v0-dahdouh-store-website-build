import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, Truck, Shield, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

/* -------------------------------------
   CATEGORY IMAGE MAP (SAFE & CLEAN)
------------------------------------- */
const categoryImages: Record<string, string> = {
  "beauty-health": "/categories/beauty.jpg",
  "electronics": "/categories/electronics.png",
  "fashion": "/categories/fashion.jpg",
  "health-fitness": "/categories/fitness.jpg",
  "kids-toys": "/categories/toys.jpg",
  "gifts": "/categories/gifts.jpg",
}

const getCategoryImage = (slug: string) =>
  categoryImages[slug] || "/categories/default.jpg"

/* -------------------------------------
   CATEGORY ORDER (UX POLISH)
------------------------------------- */
const categoryOrder = [
  "electronics",
  "fashion",
  "beauty-health",
  "health-fitness",
  "kids-toys",
  "gifts",
]

export default async function HomePage() {
  const supabase = await createClient()

  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name, slug, description")
    .limit(6)

  if (error) {
    console.error("Failed to load categories:", error)
  }

  const sortedCategories =
    categories?.sort(
      (a, b) =>
        categoryOrder.indexOf(a.slug) -
        categoryOrder.indexOf(b.slug)
    ) || []

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-background py-16 sm:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 font-serif text-4xl font-bold sm:text-5xl lg:text-6xl">
              Discover Quality Products Delivered to Your Doorstep
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Shop electronics, fashion, home essentials and more.
              Cash on Delivery available.
            </p>

            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/products">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <a
                  href="https://wa.me/447377279370"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Order via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="border-y bg-muted/30 py-12">
          <div className="container mx-auto grid gap-8 sm:grid-cols-3 text-center">
            <div>
              <Truck className="mx-auto mb-4 h-10 w-10 text-primary" />
              <h3 className="font-semibold">Fast Delivery</h3>
            </div>
            <div>
              <Shield className="mx-auto mb-4 h-10 w-10 text-primary" />
              <h3 className="font-semibold">Cash on Delivery</h3>
            </div>
            <div>
              <Phone className="mx-auto mb-4 h-10 w-10 text-primary" />
              <h3 className="font-semibold">24/7 Support</h3>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        {sortedCategories.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="mb-10 text-center">
                <h2 className="font-serif text-3xl font-bold">
                  Shop by Category
                </h2>
                <p className="text-muted-foreground">
                  Explore our diverse range of products
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                  >
                    <Card className="group overflow-hidden transition hover:shadow-xl">
                      <CardContent className="p-0">
                        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                          <Image
                            src={getCategoryImage(category.slug)}
                            alt={category.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            placeholder="blur"
                            blurDataURL="/categories/default.jpg"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        <div className="p-4">
                          <h3 className="font-semibold transition-colors group-hover:text-primary">
                            {category.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-primary py-16 text-center text-primary-foreground">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Ready to Shop?
          </h2>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  )
}