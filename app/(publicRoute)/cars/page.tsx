import Link from "next/link"

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function page() {
  const data = await fetch("https://apollo-gears-backend.onrender.com/api/v1/cars")
  const cars = await data.json()
  return (
    <div>
      <h1>cars</h1>
      {cars.data.map((car: any) => (
        <div key={car.id}>
          {car.name}
          <Link href={`/cars/${car.id}`}> view details</Link>
        </div>
      ))}
    </div>
  )
}