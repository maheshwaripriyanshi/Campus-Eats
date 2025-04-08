"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, CheckCircle2, XCircle } from "lucide-react"

export default function OrdersPage() {
  // Mock orders data
  const orders = [
    {
      id: "ORD-1234",
      date: "April 8, 2025",
      time: "12:15 PM",
      vendor: "Burger Junction",
      items: [
        { name: "Classic Cheeseburger", quantity: 2 },
        { name: "French Fries", quantity: 1 },
        { name: "Milkshake", quantity: 1 },
      ],
      total: 24.46,
      status: "ready",
      paymentMethod: "Online Payment",
    },
    {
      id: "ORD-1233",
      date: "April 7, 2025",
      time: "1:30 PM",
      vendor: "Pizza Palace",
      items: [
        { name: "Pepperoni Pizza", quantity: 1 },
        { name: "Garlic Bread", quantity: 1 },
        { name: "Soda", quantity: 2 },
      ],
      total: 18.99,
      status: "completed",
      paymentMethod: "Pay on Delivery",
    },
    {
      id: "ORD-1232",
      date: "April 5, 2025",
      time: "6:45 PM",
      vendor: "Sushi Station",
      items: [
        { name: "California Roll", quantity: 2 },
        { name: "Miso Soup", quantity: 1 },
      ],
      total: 15.5,
      status: "completed",
      paymentMethod: "Online Payment",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "preparing":
        return (
          <Badge className="bg-yellow-500">
            <Clock className="mr-1 h-3 w-3" /> Preparing
          </Badge>
        )
      case "ready":
        return (
          <Badge className="bg-green-500">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Ready for Pickup
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="text-gray-500">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" /> Cancelled
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>

      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{order.id}</CardTitle>
                  <CardDescription>
                    {order.date} at {order.time}
                  </CardDescription>
                </div>
                {getStatusBadge(order.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <h3 className="font-medium">Vendor</h3>
                  <p>{order.vendor}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Items</h3>
                  <ul className="space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Total</h3>
                    <p>${order.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Payment Method</h3>
                    <p>{order.paymentMethod}</p>
                  </div>
                </div>

                {order.status === "ready" && (
                  <Button className="bg-orange-500 hover:bg-orange-600 mt-2">Confirm Pickup</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
