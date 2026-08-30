"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState, useEffect } from "react"
import { loginAction } from "../_actions/auth"
import { useRouter } from "next/navigation"

export default function LoginForm() {



  const router = useRouter()
  const[state, formAction, pending] = useActionState( loginAction, false)


  useEffect(()=>{
    if(!state) return;
    if(!state.success){
      alert(state.message)
    }
    if(state.success){
      alert(state.message)
      router.push("/")
    }


  },[state])




  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>

        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>

        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form action={formAction}>
          <div className="flex flex-col gap-6">
            
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

            <Button type="submit" className="w-full">
              Login
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={pending} 

            >
              Login with Google
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}