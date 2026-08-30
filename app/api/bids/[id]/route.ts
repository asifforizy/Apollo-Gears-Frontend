import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const BACKEND_URL = "https://apollo-gears-backend.onrender.com"

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  const body = await req.json()

  const res = await fetch(`${BACKEND_URL}/api/v1/bids/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return NextResponse.json(data)
}
