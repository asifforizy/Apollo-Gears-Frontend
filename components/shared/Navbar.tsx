"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { logoutAction, getUser } from "@/app/(auth)/_actions/auth"

const MenuIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </svg>
)

export interface NavbarLink {
  href: string
  label: string
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logoText?: string
  logoHref?: string
  isAuthenticated?: boolean
  userRole?: string | null
}

const publicLinks: NavbarLink[] = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Cars" },
]

const roleLinks: Record<string, NavbarLink[]> = {
  admin: [
    { href: "/", label: "Home" },
    { href: "/cars", label: "Cars" },
    { href: "/admin", label: "Admin" },
  ],
  driver: [
    { href: "/", label: "Home" },
    { href: "/cars", label: "Cars" },
    { href: "/driver", label: "My Bids" },
  ],
  user: [
    { href: "/", label: "Home" },
    { href: "/cars", label: "Cars" },
    { href: "/dashboard", label: "My Rents" },
  ],
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      logoText = "Apollo Gears",
      logoHref = "/",
      isAuthenticated = false,
      userRole = null,
      ...props
    },
    ref
  ) => {
    const pathname = usePathname()
    const router = useRouter()
    const [authState, setAuthState] = useState<{
      isAuthenticated: boolean
      role: string | null
    }>({ isAuthenticated, role: userRole })

    useEffect(() => {
      getUser().then(setAuthState)
    }, [])

    const navigationLinks = authState.isAuthenticated && authState.role
      ? roleLinks[authState.role] || publicLinks
      : publicLinks

    const dashboardHref = authState.role === "admin"
      ? "/admin"
      : authState.role === "driver"
        ? "/driver"
        : "/dashboard"

    const handleLogout = async () => {
      await logoutAction()
      router.push("/login")
      router.refresh()
    }

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur",
          className
        )}
        {...props}
      >
        <div className="mx-auto flex h-14 items-center justify-between px-5 lg:px-30">
          {/* Logo */}
          <Link
            href={logoHref}
            className="text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary"
          >
            {logoText}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navigationLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 md:flex">
            {authState.isAuthenticated ? (
              <>
                <Link
                  href={dashboardHref}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
                >
                  Dashboard
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Popover>
              <PopoverTrigger>
                <MenuIcon />
                <span className="sr-only">Open menu</span>
              </PopoverTrigger>

              <PopoverContent
                align="end"
                sideOffset={8}
                className="w-56 rounded-lg p-2"
              >
                <div className="flex flex-col gap-1">
                  {navigationLinks.map((link) => {
                    const isActive =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href)

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm font-medium",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted"
                        )}
                      >
                        {link.label}
                      </Link>
                    )
                  })}

                  <div className="my-1 border-t" />

                  {authState.isAuthenticated ? (
                    <>
                      <Link
                        href={dashboardHref}
                        className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
                      >
                        Dashboard
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        className="mt-1 rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>
    )
  }
)

Navbar.displayName = "Navbar"
