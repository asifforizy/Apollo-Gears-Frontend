"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"



const MenuIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
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

export interface NavbarProps
    extends React.HTMLAttributes<HTMLElement> {
    logoText?: string
    logoHref?: string
    navigationLinks?: NavbarLink[]
}

const defaultLinks: NavbarLink[] = [
    { href: "/", label: "Home" },
    { href: "/cars", label: "Cars" },
]

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
    (
        {
            className,
            logoText = "Apollo Gears",
            logoHref = "/",
            navigationLinks = defaultLinks,
            ...props
        },
        ref
    ) => {
        const pathname = usePathname()

        return (
            <header
                ref={ref}
                className={cn(
                    "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur",
                    className
                )}
                {...props}
            >
                <div className="mx-auto flex h-14  items-center justify-between px-5 lg:px-30">

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
                        <Link href="/login">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="px-3"
                            >
                                Login
                            </Button>
                        </Link>

                        <Link href="/signup">
                            <Button
                                size="sm"
                                className="rounded-md px-4"
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9"
                                >
                                    <MenuIcon />
                                    <span className="sr-only">Open menu</span>
                                </Button>
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
                                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                )}
                                            >
                                                {link.label}
                                            </Link>
                                        )
                                    })}

                                    <div className="my-1 border-t" />

                                    <Link
                                        href="/login"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                                    >
                                        Login
                                    </Link>

                                    <Link href="/signup">
                                        <Button className="mt-1 w-full rounded-md" size="sm">
                                            Sign Up
                                        </Button>
                                    </Link>

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