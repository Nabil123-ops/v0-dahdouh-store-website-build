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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Form state
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const { data: productsData } = await supabase.from("products").select("*").order("created_at", { ascending: false })

    const { data: categoriesData } = await supabase.from("categories").select("*")

    if (productsData) setProducts(productsData)
    if (categoriesData) setCategories(categoriesData)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const productData = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      description: formData.description,
      price: Number.parseFloat(formData.price),
      original_price: formData.original_price ? Number.parseFloat(formData.original_price) : null,
      image_url: formData.image_url,
      category_id: formData.category_id,
      stock_quantity: Number.parseInt(formData.stock_quantity) || 0,
      is_featured: formData.is_featured,
      is_published: formData.is_published,
    }

    if (editingProduct) {
      await supabase.from("products").update(productData).eq("id", editingProduct.id)
    } else {
      await supabase.from("products").insert([productData])
    }

    setIsLoading(false)
    setShowAddForm(false)
    setEditingProduct(null)
    resetForm()
    loadData()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await supabase.from("products").delete().eq("id", id)
      loadData()
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price.toString(),
      original_price: product.original_price?.toString() || "",
      image_url: product.image_url,
      category_id: product.category_id,
      stock_quantity: product.stock_quantity.toString(),
      is_featured: product.is_featured,
      is_published: product.is_published,
    })
    setShowAddForm(true)
  }

  const resetForm = () => {
    setFormData({
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

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border/40 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/admin">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <h1 className="font-serif text-xl font-bold">Manage Products</h1>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {showAddForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
                <CardDescription>Fill in the product details below</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug (auto-generated if empty)</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (USD) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="original_price">Original Price (USD)</Label>
                      <Input
                        id="original_price"
                        type="number"
                        step="0.01"
                        value={formData.original_price}
                        onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Quantity *</Label>
                      <Input
                        id="stock"
                        type="number"
                        required
                        value={formData.stock_quantity}
                        onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category_id}
                        onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">Image URL *</Label>
                      <Input
                        id="image"
                        type="url"
                        required
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Switch
                        id="featured"
                        checked={formData.is_featured}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                      />
                      <Label htmlFor="featured">Featured Product</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="published"
                        checked={formData.is_published}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                      />
                      <Label htmlFor="published">Published</Label>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false)
                        setEditingProduct(null)
                        resetForm()
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {products.length > 0 ? (
              products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex gap-4">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                          <img
                            src={product.image_url || "/placeholder.svg"}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <h3 className="font-semibold">{product.name}</h3>
                            {product.is_featured && <Badge variant="secondary">Featured</Badge>}
                            {!product.is_published && <Badge variant="outline">Draft</Badge>}
                          </div>
                          <p className="mb-2 text-sm text-muted-foreground">{product.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="font-semibold text-primary">${product.price.toFixed(2)}</span>
                            {product.original_price && (
                              <span className="text-muted-foreground line-through">
                                ${product.original_price.toFixed(2)}
                              </span>
                            )}
                            <span className="text-muted-foreground">Stock: {product.stock_quantity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No products yet. Add your first product to get started.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
