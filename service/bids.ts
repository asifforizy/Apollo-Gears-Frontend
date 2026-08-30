"use server"

import { cookies } from "next/headers"
import { type Bid, type ApiResponse } from "@/lib/types"

const BACKEND_URL = "https://apollo-gears-backend.onrender.com"

export async function createBid(
  data: Omit<Bid, "id" | "createdAt" | "status" | "driver">
): Promise<ApiResponse<Bid>> {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  const res = await fetch(`${BACKEND_URL}/api/v1/bids`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  return res.json()
}

export async function updateBid(
  id: number,
  data: { status: "accepted" | "rejected" }
): Promise<ApiResponse<Bid>> {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  const res = await fetch(`${BACKEND_URL}/api/v1/bids/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  return res.json()
}
