import { cookies } from "next/headers"
import jwt, { JwtPayload } from "jsonwebtoken"
import { Navbar } from "./Navbar"

export async function AuthNavbar() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  let isAuthenticated = false
  let userRole: string | null = null

  if (accessToken) {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as JwtPayload
      isAuthenticated = true
      userRole = decoded.role || null
    } catch {
      isAuthenticated = false
    }
  }

  return <Navbar isAuthenticated={isAuthenticated} userRole={userRole} />
}
