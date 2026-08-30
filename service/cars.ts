"use server"

import { cookies } from "next/headers"
import { type Car, type ApiResponse } from "@/lib/types"

const BACKEND_URL = "https://apollo-gears-backend.onrender.com"

export async function getCars(): Promise<ApiResponse<Car[]>> {
  const res = await fetch(`${BACKEND_URL}/api/v1/cars`, {
    cache: "no-store",
  })
  return res.json()
}

export async function getCar(id: string): Promise<ApiResponse<Car>> {
  const res = await fetch(`${BACKEND_URL}/api/v1/cars/${id}`, {
    cache: "no-store",
  })
  return res.json()
}

export async function createCar(
  data: Omit<Car, "id" | "createdAt" | "available">
): Promise<ApiResponse<Car>> {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  const res = await fetch(`${BACKEND_URL}/api/v1/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  return res.json()
}
