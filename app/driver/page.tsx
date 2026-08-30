"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type Rent } from "@/lib/types"

export default function DriverPage() {
  const [rents, setRents] = useState<Rent[]>([])
  const [loading, setLoading] = useState(true)
  const [bidForms, setBidForms] = useState<
    Record<number, { amount: number; message: string }>
  >({})
  const [bidErrors, setBidErrors] = useState<Record<number, string>>({})
  const [bidSuccess, setBidSuccess] = useState<Record<number, string>>({})

  useEffect(() => {
    async function fetchRents() {
      const res = await fetch("/api/rents")
      const data = await res.json()
      if (data.success) setRents(data.data)
      setLoading(false)
    }
    fetchRents()
  }, [])

  async function handlePlaceBid(rentId: number) {
    setBidErrors((prev) => ({ ...prev, [rentId]: "" }))
    setBidSuccess((prev) => ({ ...prev, [rentId]: "" }))

    const form = bidForms[rentId]
    if (!form || !form.amount) {
      setBidErrors((prev) => ({ ...prev, [rentId]: "Amount is required" }))
      return
    }

    const res = await fetch("/api/bids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rentId, amount: form.amount, message: form.message }),
    })

    const result = await res.json()

    if (!result.success) {
      setBidErrors((prev) => ({
        ...prev,
        [rentId]: result.message || "Failed to place bid",
      }))
      return
    }

    setBidSuccess((prev) => ({
      ...prev,
      [rentId]: "Bid placed successfully",
    }))
    setBidForms((prev) => ({ ...prev, [rentId]: { amount: 0, message: "" } }))
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Driver Dashboard</h1>
      <p className="text-muted-foreground">
        Browse rent requests and place your bids
      </p>

      {rents.length === 0 ? (
        <p className="text-muted-foreground">No rent requests available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {rents.map((rent) => (
            <Card key={rent.id}>
              <CardHeader>
                <CardTitle>
                  {rent.car
                    ? `${rent.car.brand} ${rent.car.model}`
                    : `Rent #${rent.id}`}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Start Date</p>
                    <p className="font-medium">
                      {new Date(rent.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">End Date</p>
                    <p className="font-medium">
                      {new Date(rent.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        rent.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : rent.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {rent.status}
                    </span>
                  </div>
                </div>

                {rent.status === "pending" && (
                  <div className="space-y-3 border-t pt-4">
                    {bidErrors[rent.id] && (
                      <p className="text-sm text-destructive">
                        {bidErrors[rent.id]}
                      </p>
                    )}
                    {bidSuccess[rent.id] && (
                      <p className="text-sm text-green-600">
                        {bidSuccess[rent.id]}
                      </p>
                    )}
                    <div>
                      <Label>Bid Amount ($)</Label>
                      <Input
                        type="number"
                        placeholder="Your bid amount"
                        value={bidForms[rent.id]?.amount || ""}
                        onChange={(e) =>
                          setBidForms((prev) => ({
                            ...prev,
                            [rent.id]: {
                              ...prev[rent.id],
                              amount: parseFloat(e.target.value) || 0,
                            },
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Message</Label>
                      <Input
                        placeholder="Optional message"
                        value={bidForms[rent.id]?.message || ""}
                        onChange={(e) =>
                          setBidForms((prev) => ({
                            ...prev,
                            [rent.id]: {
                              ...prev[rent.id],
                              message: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handlePlaceBid(rent.id)}
                    >
                      Place Bid
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
