import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils } from "lucide-react"

export default function Home() {
  // Mock data for food vendors
  const vendors = [
    {
      id: 1,
      name: "Burger Junction",
      description: "Delicious burgers and fries",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4.5,
      deliveryTime: "15-20 min",
    },
    {
      id: 2,
      name: "Pizza Palace",
      description: "Authentic Italian pizzas",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4.3,
      deliveryTime: "20-25 min",
    },
    {
      id: 3,
      name: "Sushi Station",
      description: "Fresh sushi and Japanese cuisine",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4.7,
      deliveryTime: "15-20 min",
    },
    {
      id: 4,
      name: "Taco Fiesta",
      description: "Authentic Mexican street food",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4.2,
      deliveryTime: "10-15 min",
    },
    {
      id: 5,
      name: "Salad Bar",
      description: "Healthy salads and bowls",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4.4,
      deliveryTime: "10-15 min",
    },
    {
      id: 6,
      name: "Coffee Corner",
      description: "Premium coffee and pastries",
      image: "/placeholder.svg?height=100&width=100",
      rating: 4.6,
      deliveryTime: "5-10 min",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-orange-500" />
            <h1 className="text-2xl font-bold">Campus Eats</h1>
          </div>
          <div className="flex gap-4">
            <Link href="/cart">
              <Button variant="outline">Cart (0)</Button>
            </Link>
            <Link href="/account">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
        <div className="bg-orange-100 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2">Hungry? Order food from your favorite campus vendors</h2>
          <p className="text-gray-700 mb-4">Get your food delivered or pick it up when it's ready</p>
          <div className="flex gap-4">
            <Button className="bg-orange-500 hover:bg-orange-600">Order Now</Button>
            <Button variant="outline">View Specials</Button>
          </div>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Food Court Vendors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <Link href={`/vendor/${vendor.id}`} key={vendor.id}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{vendor.name}</CardTitle>
                      <CardDescription>{vendor.description}</CardDescription>
                    </div>
                    <img
                      src={vendor.image || "/placeholder.svg"}
                      alt={vendor.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">⭐ {vendor.rating}</span>
                    <span>🕒 {vendor.deliveryTime}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full justify-start text-orange-500">
                    View Menu
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">1. Browse</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>Browse menus from various food vendors in the university food court</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">2. Order</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>Select your items, customize as needed, and add them to your cart</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">3. Pay & Enjoy</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>Pay online or choose pay-on-delivery, then pick up your order when it's ready</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
