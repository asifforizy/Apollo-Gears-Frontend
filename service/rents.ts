"use server"

import { cookies } from "next/headers"
import { type Rent, type ApiResponse } from "@/lib/types"

const BACKEND_URL = "https://apollo-gears-backend.onrender.com"

export async function createRent(
  data: Omit<Rent, "id" | "createdAt" | "status" | "user">
): Promise<ApiResponse<Rent>> {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  const res = await fetch(`${BACKEND_URL}/api/v1/rents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  return res.json()
}
