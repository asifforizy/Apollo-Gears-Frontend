"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { loginAction } from "../_actions/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setPending(true)

    const formData = new FormData(e.currentTarget)
    const result = await loginAction(formData)

    setPending(false)

    if (!result.success) {
      setError(result.message)
      return
    }

    router.push("/")
    router.refresh()
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link
            href="/signup"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign Up
          </Link>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            {error && (
              <div className="rounded-md bg-red-100 p-3 text-sm text-red-800 dark:bg-red-900 dark:text-red-200">
                {error}
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
