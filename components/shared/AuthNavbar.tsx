import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { Navbar } from "./Navbar"

export async function AuthNavbar() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  let isAuthenticated = false

  if (accessToken) {
    try {
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string)
      isAuthenticated = true
    } catch {
      isAuthenticated = false
    }
  }

  return <Navbar isAuthenticated={isAuthenticated} />
}
