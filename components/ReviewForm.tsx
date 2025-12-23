"use client"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export default function ReviewForm({ productId }: { productId: string }) {
  const [name, setName] = useState("")
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const supabase = createClient()

  const handleSubmit = async () => {
    await supabase.from("reviews").insert({ product_id: productId, name, rating, comment })
    setSubmitted(true)
  }

  if (submitted) return <p className="text-green-600">Thanks for your review!</p>

  return (
    <div className="mt-4">
      <input className="border p-2 w-full mb-2" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
      <select className="border p-2 w-full mb-2" value={rating} onChange={e => setRating(Number(e.target.value))}>
        {[5,4,3,2,1].map(r => <option key={r}>{r} stars</option>)}
      </select>
      <textarea className="border p-2 w-full mb-2" placeholder="Write your review..." value={comment} onChange={e => setComment(e.target.value)} />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  )
}