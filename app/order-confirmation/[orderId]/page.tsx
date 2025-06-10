"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { getOrder } from "@/lib/firebase"

export default function OrderConfirmationPage() {
  const params = useParams()
  const orderId = params.orderId as string
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await getOrder(orderId)
        setOrder(orderData)
      } catch (error) {
        console.error("Error fetching order:", error)
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      fetchOrder()
    }
  }, [orderId])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading order details...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="text-center mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">Thank you for your order. We'll start preparing it right away!</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p>
              <strong>Order ID:</strong> {orderId}
            </p>
            <p>
              <strong>Status:</strong> <span className="capitalize">{order.status}</span>
            </p>
            <p>
              <strong>Payment:</strong> Cash on Delivery
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Items Ordered:</h3>
            {order.items?.map((item: any, index: number) => (
              <div key={index} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>{(item.price * item.quantity).toLocaleString()} PKR</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{order.total?.toLocaleString()} PKR</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Delivery Information:</h3>
            <p>
              <strong>Name:</strong> {order.customerInfo?.name}
            </p>
            <p>
              <strong>Phone:</strong> {order.customerInfo?.phone}
            </p>
            <p>
              <strong>Address:</strong> {order.customerInfo?.address}
            </p>
            {order.customerInfo?.notes && (
              <p>
                <strong>Notes:</strong> {order.customerInfo.notes}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <p className="text-gray-600">A confirmation email has been sent to {order.customerInfo?.email}</p>
        <p className="text-gray-600">We'll contact you shortly to confirm the delivery time.</p>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  )
}
