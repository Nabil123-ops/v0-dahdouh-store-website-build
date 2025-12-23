"use client"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function ReviewList({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false })
      setReviews(data || [])
    }
    fetch()
  }, [productId])

  return (
    <div className="space-y-3 mb-6">
      {reviews.map(r => (
        <div key={r.id} className="border p-3 rounded-md">
          <div className="font-semibold">{r.name}</div>
          <div className="text-yellow-500">{"★".repeat(r.rating)}</div>
          <p className="text-muted-foreground">{r.comment}</p>
        </div>
      ))}
      {reviews.length === 0 && <p className="text-sm text-muted-foreground">No reviews yet.</p>}
    </div>
  )
}