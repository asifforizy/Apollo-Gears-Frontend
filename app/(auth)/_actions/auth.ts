"use server";

import { cookies } from "next/headers";

export async function loginAction(preState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const res = await fetch(
    "https://apollo-gears-backend.onrender.com/api/v1/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  const result = await res.json();

  const cookieOptions = await cookies();
  const { accessToken, refreshToken } = result.data;

  cookieOptions.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  cookieOptions.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return {
     success: true,
     message: "Login successful"
     };
}
