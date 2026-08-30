import { getCar } from "@/service/cars"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const result = await getCar(id)

  if (!result.success || !result.data) {
    notFound()
  }

  const car = result.data

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            {car.brand} {car.model}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Brand</p>
                <p className="font-medium">{car.brand}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Model</p>
                <p className="font-medium">{car.model}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Year</p>
                <p className="font-medium">{car.year}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Price</p>
                <p className="font-medium">${car.price}/day</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <p
                  className={
                    car.available
                      ? "font-medium text-green-600"
                      : "font-medium text-destructive"
                  }
                >
                  {car.available ? "Available" : "Rented"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
