"use server"

import { cookies } from "next/headers"

export interface AuthState {
  success: boolean
  message: string
}

const BACKEND_URL = "https://apollo-gears-backend.onrender.com"

export async function loginAction(
  preState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { success: false, message: "Email and password are required" }
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const result = await res.json()

    if (!res.ok || !result.data) {
      return {
        success: false,
        message: result.message || "Invalid email or password",
      }
    }

    const { accessToken, refreshToken } = result.data
    const cookieStore = await cookies()

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24,
      path: "/",
    })

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return { success: true, message: "Login successful" }
  } catch {
    return { success: false, message: "Network error. Please try again." }
  }
}

export async function signupAction(
  preState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!name || !email || !password || !confirmPassword) {
    return { success: false, message: "All fields are required" }
  }

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" }
  }

  if (password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters" }
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })

    const result = await res.json()

    if (!res.ok || !result.data) {
      return {
        success: false,
        message: result.message || "Registration failed",
      }
    }

    const { accessToken, refreshToken } = result.data
    const cookieStore = await cookies()

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24,
      path: "/",
    })

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return { success: true, message: "Account created successfully" }
  } catch {
    return { success: false, message: "Network error. Please try again." }
  }
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("accessToken")
  cookieStore.delete("refreshToken")
}
