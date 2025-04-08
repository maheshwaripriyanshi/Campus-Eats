"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Star, Plus, Minus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for vendors
const vendorsData = {
  1: {
    id: 1,
    name: "Burger Junction",
    description: "Delicious burgers and fries",
    image: "/placeholder.svg?height=200&width=400",
    rating: 4.5,
    deliveryTime: "15-20 min",
    categories: ["Burgers", "Sides", "Drinks"],
    menu: {
      Burgers: [
        {
          id: 101,
          name: "Classic Cheeseburger",
          description: "Beef patty with cheese, lettuce, tomato, and special sauce",
          price: 7.99,
          image: "/placeholder.svg?height=100&width=100",
          popular: true,
        },
        {
          id: 102,
          name: "Double Bacon Burger",
          description: "Double beef patty with bacon, cheese, and BBQ sauce",
          price: 9.99,
          image: "/placeholder.svg?height=100&width=100",
          popular: true,
        },
        {
          id: 103,
          name: "Veggie Burger",
          description: "Plant-based patty with avocado, lettuce, and vegan mayo",
          price: 8.49,
          image: "/placeholder.svg?height=100&width=100",
          popular: false,
        },
      ],
      Sides: [
        {
          id: 201,
          name: "French Fries",
          description: "Crispy golden fries with sea salt",
          price: 3.49,
          image: "/placeholder.svg?height=100&width=100",
          popular: true,
        },
        {
          id: 202,
          name: "Onion Rings",
          description: "Crispy battered onion rings",
          price: 4.49,
          image: "/placeholder.svg?height=100&width=100",
          popular: false,
        },
      ],
      Drinks: [
        {
          id: 301,
          name: "Soda",
          description: "Choice of Coke, Sprite, or Dr. Pepper",
          price: 1.99,
          image: "/placeholder.svg?height=100&width=100",
          popular: false,
        },
        {
          id: 302,
          name: "Milkshake",
          description: "Chocolate, vanilla, or strawberry",
          price: 4.99,
          image: "/placeholder.svg?height=100&width=100",
          popular: true,
        },
      ],
    },
  },
  // Add more vendors as needed
}

export default function VendorPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const vendorId = Number(params.id)
  const vendor = vendorsData[vendorId as keyof typeof vendorsData]

  const [selectedItems, setSelectedItems] = useState<{ [key: number]: number }>({})

  if (!vendor) {
    return <div className="container mx-auto px-4 py-8">Vendor not found</div>
  }

  const addToCart = (itemId: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))

    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
    })
  }

  const removeFromCart = (itemId: number) => {
    setSelectedItems((prev) => {
      const newItems = { ...prev }
      if (newItems[itemId] > 1) {
        newItems[itemId] -= 1
      } else {
        delete newItems[itemId]
      }
      return newItems
    })
  }

  const getItemQuantity = (itemId: number) => {
    return selectedItems[itemId] || 0
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to vendors
      </Button>

      <div className="relative h-48 md:h-64 rounded-lg overflow-hidden mb-6">
        <img src={vendor.image || "/placeholder.svg"} alt={vendor.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{vendor.name}</h1>
          <p className="text-white/90">{vendor.description}</p>
          <div className="flex items-center mt-2">
            <Badge className="flex items-center gap-1 mr-3">
              <Star className="h-3 w-3" /> {vendor.rating}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 bg-white/20 text-white">
              <Clock className="h-3 w-3" /> {vendor.deliveryTime}
            </Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue={vendor.categories[0]} className="mb-8">
        <TabsList className="mb-4">
          {vendor.categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {vendor.categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vendor.menu[category as keyof typeof vendor.menu].map((item) => (
                <Card key={item.id} className="flex flex-col h-full">
                  <div className="flex p-4">
                    <div className="flex-1">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      <div className="mt-2">
                        <span className="font-semibold">${item.price.toFixed(2)}</span>
                        {item.popular && <Badge className="ml-2 bg-orange-500">Popular</Badge>}
                      </div>
                    </div>
                    <div className="ml-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 rounded-md object-cover"
                      />
                    </div>
                  </div>
                  <CardFooter className="border-t mt-auto pt-3">
                    {getItemQuantity(item.id) > 0 ? (
                      <div className="flex items-center justify-between w-full">
                        <Button variant="outline" size="icon" onClick={() => removeFromCart(item.id)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-4 font-medium">{getItemQuantity(item.id)}</span>
                        <Button variant="outline" size="icon" onClick={() => addToCart(item.id)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={() => addToCart(item.id)}>
                        Add to Cart
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {Object.keys(selectedItems).length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <p className="font-bold">{Object.values(selectedItems).reduce((a, b) => a + b, 0)} items selected</p>
            </div>
            <Link href="/cart">
              <Button className="bg-orange-500 hover:bg-orange-600">View Cart</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
