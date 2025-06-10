"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getOrder, updateOrderStatus } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const orderId = params.orderId as string

  useEffect(() => {
    // Check if user is admin
    if (!user) {
      router.push("/auth")
      return
    }

    if (user.email !== "abdulmoeez644@gmail.com") {
      router.push("/")
      return
    }

    fetchOrder()
  }, [user, router, orderId])

  const fetchOrder = async () => {
    try {
      const orderData = await getOrder(orderId)
      setOrder(orderData)
    } catch (error) {
      console.error("Error fetching order:", error)
      toast({
        title: "Error",
        description: "Failed to fetch order details",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      toast({
        title: "Success",
        description: "Order status updated successfully",
      })
      fetchOrder() // Refresh order
    } catch (error) {
      console.error("Error updating order status:", error)
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "preparing":
        return "bg-orange-100 text-orange-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (date: any) => {
    if (!date) return "N/A"
    const d = date.toDate ? date.toDate() : new Date(date)
    return d.toLocaleDateString() + " " + d.toLocaleTimeString()
  }

  if (!user || user.email !== "abdulmoeez644@gmail.com") {
    return null
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading order details...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <Link href="/admin">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Order #{orderId.slice(-8)}</h1>
            <p className="text-gray-600">{formatDate(order.createdAt)}</p>
          </div>
        </div>
        <Badge className={getStatusColor(order.status)}>{order.status?.toUpperCase() || "PENDING"}</Badge>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{order.customerInfo?.name}</h3>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>{order.customerInfo?.phone}</span>
              <Button variant="outline" size="sm" asChild>
                <a href={`tel:${order.customerInfo?.phone}`}>Call</a>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <span>{order.customerInfo?.email}</span>
              <Button variant="outline" size="sm" asChild>
                <a href={`mailto:${order.customerInfo?.email}`}>Email</a>
              </Button>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p>{order.customerInfo?.address}</p>
                <Button variant="outline" size="sm" className="mt-2" asChild>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(order.customerInfo?.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Map
                  </a>
                </Button>
              </div>
            </div>
            {order.customerInfo?.notes && (
              <div className="p-3 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold mb-1">Special Instructions:</h4>
                <p className="text-sm">{order.customerInfo.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Items Ordered:</h3>
              <div className="space-y-2">
                {order.items?.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.price.toLocaleString()} PKR × {item.quantity}
                      </p>
                    </div>
                    <span className="font-semibold">{(item.price * item.quantity).toLocaleString()} PKR</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Amount</span>
                  <span>{order.total?.toLocaleString()} PKR</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Payment Method:{" "}
                  {order.paymentMethod === "cash_on_delivery" ? "Cash on Delivery" : order.paymentMethod}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Update Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { status: "pending", label: "Pending", description: "Order received" },
              { status: "confirmed", label: "Confirmed", description: "Order confirmed" },
              { status: "preparing", label: "Preparing", description: "Being prepared" },
              { status: "delivered", label: "Delivered", description: "Order delivered" },
              { status: "cancelled", label: "Cancelled", description: "Order cancelled" },
            ].map(({ status, label, description }) => (
              <Button
                key={status}
                variant={order.status === status ? "default" : "outline"}
                className="h-auto p-4 flex flex-col items-center"
                onClick={() => handleStatusUpdate(status)}
                disabled={order.status === status}
              >
                <span className="font-semibold">{label}</span>
                <span className="text-xs text-center mt-1">{description}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
