import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const params = await searchParams
  const query = params.q || ""
  const supabase = await createClient()

  let products = []

  if (query) {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("is_published", true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order("created_at", { ascending: false })

    products = data || []
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 font-serif text-3xl font-bold">Search Results {query && `for "${query}"`}</h1>
            <p className="text-muted-foreground">
              {products.length > 0
                ? `Found ${products.length} product${products.length !== 1 ? "s" : ""}`
                : "No products found"}
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  originalPrice={product.original_price}
                  imageUrl={product.image_url}
                  isFeatured={product.is_featured}
                />
              ))}
            </div>
          ) : query ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No products match your search. Try different keywords.</p>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Enter a search term to find products.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
