"use server"

import { cookies } from "next/headers"
import { type User, type ApiResponse } from "@/lib/types"

const BACKEND_URL = "https://apollo-gears-backend.onrender.com"

export async function getUsers(): Promise<ApiResponse<User[]>> {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  const res = await fetch(`${BACKEND_URL}/api/v1/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return res.json()
}
