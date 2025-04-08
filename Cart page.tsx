"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Trash, CreditCard, Banknote } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { toast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState("prepaid")

  // Mock cart data
  const cartItems = [
    {
      id: 101,
      name: "Classic Cheeseburger",
      price: 7.99,
      quantity: 2,
      vendorId: 1,
      vendorName: "Burger Junction",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 201,
      name: "French Fries",
      price: 3.49,
      quantity: 1,
      vendorId: 1,
      vendorName: "Burger Junction",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 302,
      name: "Milkshake",
      price: 4.99,
      quantity: 1,
      vendorId: 1,
      vendorName: "Burger Junction",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 1.99
  const total = subtotal + deliveryFee

  const handleCheckout = () => {
    toast({
      title: "Order placed successfully!",
      description: `Your order has been placed with ${paymentMethod === "prepaid" ? "online payment" : "pay on delivery"}.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Cart</CardTitle>
              <CardDescription>You have {cartItems.length} items in your cart</CardDescription>
            </CardHeader>
            <CardContent>
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <Link href="/">
                    <Button>Browse Vendors</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center py-2">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 rounded-md object-cover mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">From {item.vendorName}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-sm">
                            ${item.price.toFixed(2)} × {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        <Button variant="ghost" size="sm" className="text-red-500 mt-1">
                          <Trash className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Your phone number" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location">Pickup Location</Label>
                  <Input id="location" placeholder="e.g., Engineering Building, Room 101" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Special Instructions (Optional)</Label>
                  <Input id="notes" placeholder="Any special instructions for delivery" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-3">Payment Method</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="prepaid" id="prepaid" />
                    <Label htmlFor="prepaid" className="flex items-center cursor-pointer">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay Online
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="pod" id="pod" />
                    <Label htmlFor="pod" className="flex items-center cursor-pointer">
                      <Banknote className="mr-2 h-4 w-4" />
                      Pay on Delivery
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === "prepaid" && (
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={handleCheckout}>
                Place Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
