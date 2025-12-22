"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const ADMIN_EMAIL = "admin@dahdouhai.live"

export default function AdminProductsPage() {
  const supabase = createClient()

  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    original_price: "",
    stock_quantity: "",
    category_id: "",
    image_files: [] as File[],
    is_featured: false,
    is_published: true,
  })

  // 🔐 admin check
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user || data.user.email !== ADMIN_EMAIL) {
        location.href = "/auth/login"
        return
      }

      loadData()
    }
    init()
  }, [])

  const loadData = async () => {
    const { data: p } = await supabase.from("products").select("*")
    const { data: c } = await supabase.from("categories").select("*")
    setProducts(p || [])
    setCategories(c || [])
  }

  // 🖼 Upload images
  const uploadImages = async () => {
    const urls: string[] = []

    for (const file of form.image_files) {
      const fileName = `${Date.now()}-${file.name}`

      const { error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file)

      if (error) {
        alert(error.message)
        return []
      }

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName)

      urls.push(data.publicUrl)
    }

    return urls
  }

  // 💾 Save product
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!form.category_id) {
      alert("Select a category")
      return
    }

    if (form.image_files.length === 0) {
      alert("Upload at least one image")
      return
    }

    setLoading(true)

    const images = await uploadImages()
    if (images.length === 0) {
      setLoading(false)
      return
    }

    const { error } = await supabase.from("products").insert({
      name: form.name,
      slug: form.name.toLowerCase().replace(/\s+/g, "-"),
      description: form.description,
      price: Number(form.price),
      original_price: form.original_price ? Number(form.original_price) : null,
      stock_quantity: Number(form.stock_quantity),
      category_id: form.category_id,
      images,
      image_url: images[0],
      is_featured: form.is_featured,
      is_published: form.is_published,
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Product saved ✅")
      setForm({
        name: "",
        description: "",
        price: "",
        original_price: "",
        stock_quantity: "",
        category_id: "",
        image_files: [],
        is_featured: false,
        is_published: true,
      })
      loadData()
    }

    setLoading(false)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Name" required value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} />

            <Textarea placeholder="Description"
              onChange={e => setForm({ ...form, description: e.target.value })} />

            <Input type="number" placeholder="Price (after discount)" required
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })} />

            <Input type="number" placeholder="Original price (optional)"
              value={form.original_price}
              onChange={e => setForm({ ...form, original_price: e.target.value })} />

            <Input type="number" placeholder="Stock"
              onChange={e => setForm({ ...form, stock_quantity: e.target.value })} />

            <Input type="file" multiple accept="image/*"
              onChange={e =>
                setForm({ ...form, image_files: Array.from(e.target.files || []) })
              } />

            <Select value={form.category_id}
              onValueChange={v => setForm({ ...form, category_id: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <Switch checked={form.is_featured}
                  onCheckedChange={v => setForm({ ...form, is_featured: v })} />
                Featured
              </label>

              <label className="flex items-center gap-2">
                <Switch checked={form.is_published}
                  onCheckedChange={v => setForm({ ...form, is_published: v })} />
                Published
              </label>
            </div>

            <Button disabled={loading}>
              {loading ? "Saving..." : "Save Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}