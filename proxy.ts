import { NextRequest, NextResponse } from "next/server"
import jwt, { JwtPayload } from "jsonwebtoken"

type Role = "admin" | "user" | "driver"

const PUBLIC_PATHS = ["/login", "/signup", "/cars"]

const ROLE_ROUTES: Record<Role, string[]> = {
  admin: ["/admin"],
  driver: ["/driver"],
  user: ["/dashboard"],
}

const DEFAULT_ROLE_REDIRECT: Record<Role, string> = {
  admin: "/admin",
  driver: "/driver",
  user: "/dashboard",
}

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname === "/") {
    return NextResponse.next()
  }

  const isPublic = PUBLIC_PATHS.some((route) => pathname.startsWith(route))

  if (isPublic) {
    return NextResponse.next()
  }

  const accessToken = req.cookies.get("accessToken")?.value

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  let userRole: Role | null = null

  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload
    userRole = decoded.role as Role
  } catch {
    const res = NextResponse.redirect(new URL("/login", req.url))
    res.cookies.delete("accessToken")
    res.cookies.delete("refreshToken")
    return res
  }

  if (pathname === "/login" || pathname === "/signup") {
    const redirectPath = userRole ? DEFAULT_ROLE_REDIRECT[userRole] : "/"
    return NextResponse.redirect(new URL(redirectPath, req.url))
  }

  const allowedRoutes = ROLE_ROUTES[userRole] || []
  const hasAccess = allowedRoutes.some((route) => pathname.startsWith(route))

  if (!hasAccess) {
    const redirectPath = DEFAULT_ROLE_REDIRECT[userRole]
    return NextResponse.redirect(new URL(redirectPath, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
