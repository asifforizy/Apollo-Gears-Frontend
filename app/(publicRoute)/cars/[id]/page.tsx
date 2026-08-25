/* eslint-disable @typescript-eslint/no-explicit-any */
export const revalidate = 60
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const data = await fetch(`https://apollo-gears-backend.onrender.com/api/v1/cars${id}`)
  const car = await data.json()

  return <div>{car.data.name}</div>
}

export async function generateStaticParams() {
  const car = await fetch("https://apollo-gears-backend.onrender.com/api/v1/cars").then((res) =>
    res.json()
  )
  return car?.data.map((c: any) => ({
    id: String(c.id),
  }))
}