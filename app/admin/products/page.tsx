"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  original_price: number | null
  image_url: string
  category_id: string
  stock_quantity: number
  is_featured: boolean
  is_published: boolean
}

type Category = {
  id: string
  name: string
}

const ADMIN_EMAIL = "admin@dahdouhai.live"

export default function AdminProductsPage() {
  const supabase = createClient()
  const router = useRouter()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    original_price: "",
    image_url: "",
    category_id: "",
    stock_quantity: "",
    is_featured: false,
    is_published: true,
  })

  // 🔐 Admin check
  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user || data.user.email !== ADMIN_EMAIL) {
        router.replace("/auth/login")
        return
      }
      loadData()
    }
    checkAdmin()
  }, [router, supabase])

  const loadData = async () => {
    const { data: products } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    const { data: categories } = await supabase.from("categories").select("*")

    if (products) setProducts(products)
    if (categories) setCategories(categories)
  }

  const resetForm = () => {
    setForm({
      name: "",
      slug: "",
      description: "",
      price: "",
      original_price: "",
      image_url: "",
      category_id: "",
      stock_quantity: "",
      is_featured: false,
      is_published: true,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.category_id) {
      alert("Please select a category")
      return
    }

    setLoading(true)

    const productData = {
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-"),
      description: form.description,
      price: Number(form.price),
      original_price: form.original_price ? Number(form.original_price) : null,
      image_url: form.image_url,
      category_id: form.category_id,
      stock_quantity: Number(form.stock_quantity),
      is_featured: form.is_featured,
      is_published: form.is_published,
    }

    let error
    if (editing) {
      ;({ error } = await supabase.from("products").update(productData).eq("id", editing.id))
    } else {
      ;({ error } = await supabase.from("products").insert(productData))
    }

    if (error) {
      alert(error.message)
    } else {
      resetForm()
      setEditing(null)
      setShowForm(false)
      loadData()
    }

    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete product?")) return
    await supabase.from("products").delete().eq("id", id)
    loadData()
  }

  const handleEdit = (p: Product) => {
    setEditing(p)
    setForm({
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price.toString(),
      original_price: p.original_price?.toString() || "",
      image_url: p.image_url,
      category_id: p.category_id,
      stock_quantity: p.stock_quantity.toString(),
      is_featured: p.is_featured,
      is_published: p.is_published,
    })
    setShowForm(true)
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container flex items-center gap-4 py-4">
          <Button size="icon" variant="ghost" asChild>
            <Link href="/admin">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Manage Products</h1>
          <Button className="ml-auto" onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </header>

      <main className="container py-8 space-y-6">
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>{editing ? "Edit Product" : "Add Product"}</CardTitle>
              <CardDescription>Fill product info</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <Textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                <Input type="number" placeholder="Price" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                <Input type="number" placeholder="Original price (optional)" value={form.original_price} onChange={e => setForm({ ...form, original_price: e.target.value })} />
                <Input type="number" placeholder="Stock quantity" required value={form.stock_quantity} onChange={e => setForm({ ...form, stock_quantity: e.target.value })} />
                <Input placeholder="Image URL" required value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} />

                <Select value={form.category_id} onValueChange={v => setForm({ ...form, category_id: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <Switch checked={form.is_featured} onCheckedChange={v => setForm({ ...form, is_featured: v })} />
                    Featured
                  </label>
                  <label className="flex items-center gap-2">
                    <Switch checked={form.is_published} onCheckedChange={v => setForm({ ...form, is_published: v })} />
                    Published
                  </label>
                </div>

                <Button disabled={loading}>{loading ? "Saving..." : "Save Product"}</Button>
              </form>
            </CardContent>
          </Card>
        )}

        {products.map(p => (
          <Card key={p.id}>
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-muted-foreground">${p.price}</p>
                {p.is_featured && <Badge>Featured</Badge>}
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" onClick={() => handleEdit(p)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" onClick={() => handleDelete(p.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  )
}