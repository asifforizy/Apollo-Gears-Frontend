"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type User, type Car } from "@/lib/types"

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [showCarForm, setShowCarForm] = useState(false)
  const [carForm, setCarForm] = useState({
    name: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    image: "",
  })
  const [carError, setCarError] = useState("")
  const [carSuccess, setCarSuccess] = useState("")

  useEffect(() => {
    async function fetchData() {
      const [usersRes, carsRes] = await Promise.all([
        fetch("/api/users"),
        fetch("/api/cars"),
      ])
      const usersData = await usersRes.json()
      const carsData = await carsRes.json()
      if (usersData.success) setUsers(usersData.data)
      if (carsData.success) setCars(carsData.data)
      setLoading(false)
    }
    fetchData()
  }, [])

  async function handleCreateCar(e: React.FormEvent) {
    e.preventDefault()
    setCarError("")
    setCarSuccess("")

    const res = await fetch("/api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carForm),
    })

    const result = await res.json()

    if (!result.success) {
      setCarError(result.message || "Failed to create car")
      return
    }

    setCars([...cars, result.data])
    setCarSuccess("Car created successfully")
    setCarForm({ name: "", brand: "", model: "", year: new Date().getFullYear(), price: 0, image: "" })
    setShowCarForm(false)
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
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Users ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <p className="text-muted-foreground">No users found.</p>
            ) : (
              <div className="space-y-3">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <span className="rounded-full bg-secondary px-2 py-1 text-xs font-medium">
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Cars ({cars.length})</CardTitle>
            <Button size="sm" onClick={() => setShowCarForm(!showCarForm)}>
              {showCarForm ? "Cancel" : "+ Add Car"}
            </Button>
          </CardHeader>
          <CardContent>
            {showCarForm && (
              <form onSubmit={handleCreateCar} className="mb-4 space-y-3">
                {carError && (
                  <p className="text-sm text-destructive">{carError}</p>
                )}
                {carSuccess && (
                  <p className="text-sm text-green-600">{carSuccess}</p>
                )}
                <Input
                  placeholder="Name"
                  value={carForm.name}
                  onChange={(e) =>
                    setCarForm({ ...carForm, name: e.target.value })
                  }
                  required
                />
                <Input
                  placeholder="Brand"
                  value={carForm.brand}
                  onChange={(e) =>
                    setCarForm({ ...carForm, brand: e.target.value })
                  }
                  required
                />
                <Input
                  placeholder="Model"
                  value={carForm.model}
                  onChange={(e) =>
                    setCarForm({ ...carForm, model: e.target.value })
                  }
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Year</Label>
                    <Input
                      type="number"
                      value={carForm.year}
                      onChange={(e) =>
                        setCarForm({
                          ...carForm,
                          year: parseInt(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Price/day ($)</Label>
                    <Input
                      type="number"
                      value={carForm.price}
                      onChange={(e) =>
                        setCarForm({
                          ...carForm,
                          price: parseInt(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <Input
                  placeholder="Image URL"
                  value={carForm.image}
                  onChange={(e) =>
                    setCarForm({ ...carForm, image: e.target.value })
                  }
                />
                <Button type="submit" className="w-full">
                  Create Car
                </Button>
              </form>
            )}

            {cars.length === 0 ? (
              <p className="text-muted-foreground">No cars found.</p>
            ) : (
              <div className="space-y-3">
                {cars.map((car) => (
                  <div
                    key={car.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">
                        {car.brand} {car.model}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {car.year} - ${car.price}/day
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        car.available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {car.available ? "Available" : "Rented"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
