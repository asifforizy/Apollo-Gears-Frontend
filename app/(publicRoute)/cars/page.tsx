import Link from "next/link"
import { getCars } from "@/service/cars"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function CarsPage() {
  const result = await getCars()

  if (!result.success) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">Cars</h1>
        <p className="mt-4 text-destructive">Failed to load cars.</p>
      </div>
    )
  }

  const cars = result.data

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Cars</h1>
      <p className="mt-2 text-muted-foreground">
        Browse our available fleet
      </p>

      {cars.length === 0 ? (
        <p className="mt-8 text-muted-foreground">No cars available.</p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <Card key={car.id}>
              <CardHeader>
                <CardTitle>
                  {car.brand} {car.model}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Year: {car.year}</p>
                  <p>Price: ${car.price}/day</p>
                  <p>
                    Status:{" "}
                    <span
                      className={
                        car.available
                          ? "text-green-600"
                          : "text-destructive"
                      }
                    >
                      {car.available ? "Available" : "Rented"}
                    </span>
                  </p>
                </div>
                <Link
                  href={`/cars/${car.id}`}
                  className="mt-4 block w-full rounded-4xl border border-input bg-input/30 px-3 py-2 text-center text-sm font-medium transition-colors hover:bg-input/50"
                >
                  View Details
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
