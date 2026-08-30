import { cookies } from "next/headers"

const BACKEND_URL = "https://apollo-gears-backend.onrender.com"

export async function apiGet<T>(
  path: string
): Promise<{ success: boolean; data: T; message?: string }> {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  })

  return res.json()
}

export async function apiPost<T>(
  path: string,
  body: unknown
): Promise<{ success: boolean; data: T; message?: string }> {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  })

  return res.json()
}

export async function apiPatch<T>(
  path: string,
  body: unknown
): Promise<{ success: boolean; data: T; message?: string }> {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  })

  return res.json()
}
