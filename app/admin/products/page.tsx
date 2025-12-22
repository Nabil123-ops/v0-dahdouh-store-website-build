"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const ADMIN_EMAIL = "admin@dahdouhai.live"

type Product = {
  id: string
  name: string
  price: number
  image_url: string
  images: string[]
  is_featured: boolean
}

export default function AdminProductsPage() {
  const supabase = createClient()
  const router = useRouter()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    stock_quantity: "",
    is_featured: false,
    is_published: true,
    image_files: [] as File[],
  })

  // 🔐 Admin check
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user || data.user.email !== ADMIN_EMAIL) {
        router.replace("/auth/login")
      } else {
        loadData()
      }
    })
  }, [])

  const loadData = async () => {
    const { data: products } = await supabase.from("products").select("*")
    const { data: categories } = await supabase.from("categories").select("*")
    if (products) setProducts(products)
    if (categories) setCategories(categories)
  }

  // 📤 Upload multiple images
  const uploadImages = async (): Promise<string[]> => {
    const urls: string[] = []

    for (const file of form.image_files) {
      const ext = file.name.split(".").pop()
      const fileName = `${crypto.randomUUID()}.${ext}`

      const { error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file)

      if (error) throw error

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName)

      urls.push(data.publicUrl)
    }

    return urls
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const imageUrls = await uploadImages()

      const productData = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category_id: form.category_id,
        stock_quantity: Number(form.stock_quantity),
        is_featured: form.is_featured,
        is_published: form.is_published,
        image_url: imageUrls[0], // main image
        images: imageUrls, // gallery
      }

      if (editing) {
        await supabase.from("products").update(productData).eq("id", editing.id)
      } else {
        await supabase.from("products").insert(productData)
      }

      setShowForm(false)
      setEditing(null)
      loadData()
    } catch (err: any) {
      alert(err.message)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container flex items-center gap-4 py-4">
          <Button size="icon" variant="ghost" asChild>
            <Link href="/admin"><ArrowLeft /></Link>
          </Button>
          <h1 className="text-xl font-bold">Products</h1>
          <Button className="ml-auto" onClick={() => setShowForm(true)}>
            <Plus className="mr-2" /> Add Product
          </Button>
        </div>
      </header>

      <main className="container py-8 space-y-6">
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add Product (Multiple Images)</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Name" required onChange={e => setForm({ ...form, name: e.target.value })} />
                <Textarea placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
                <Input type="number" placeholder="Price" required onChange={e => setForm({ ...form, price: e.target.value })} />

                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  required={!editing}
                  onChange={e =>
                    setForm({ ...form, image_files: Array.from(e.target.files || []) })
                  }
                />

                {/* Preview */}
                <div className="flex gap-2 flex-wrap">
                  {form.image_files.map((file, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(file)}
                      className="h-20 w-20 rounded object-cover"
                    />
                  ))}
                </div>

                <Button disabled={loading}>
                  {loading ? "Saving..." : "Save Product"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {products.map(p => (
          <Card key={p.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <img src={p.image_url} className="h-16 w-16 rounded object-cover" />
              <div>
                <h3 className="font-semibold">{p.name}</h3>
                <p>${p.price}</p>
                {p.is_featured && <Badge>Featured</Badge>}
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  )
}