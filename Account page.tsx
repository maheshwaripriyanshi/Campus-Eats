"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AccountPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [studentId, setStudentId] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Login successful",
      description: "Welcome back to Campus Eats!",
    })
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Account created",
      description: "Your account has been created successfully!",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>

      <div className="max-w-md mx-auto">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>Enter your email and password to access your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleLogin}>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="#" className="text-sm text-orange-500 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600" type="submit">
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>Sign up to start ordering food from campus vendors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSignup}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      placeholder="Your student ID"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="signupEmail">Email</Label>
                    <Input
                      id="signupEmail"
                      type="email"
                      placeholder="your.email@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="signupPassword">Password</Label>
                    <Input
                      id="signupPassword"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600" type="submit">
                    Create Account
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-gray-500">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
