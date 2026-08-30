import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const BACKEND_URL = "https://apollo-gears-backend.onrender.com"

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  const res = await fetch(`${BACKEND_URL}/api/v1/rents`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  const data = await res.json()
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value
  const body = await req.json()

  const res = await fetch(`${BACKEND_URL}/api/v1/rents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return NextResponse.json(data)
}
