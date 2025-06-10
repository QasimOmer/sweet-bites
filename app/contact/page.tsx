import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">48 C Rafi Garden Sahiwal, 57000</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">03036580198</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">abdulmoeez644@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                    <p>Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">How to Order</h3>
                <ol className="list-decimal list-inside space-y-1 text-gray-600">
                  <li>Browse our delicious products online</li>
                  <li>Add items to your cart</li>
                  <li>Proceed to checkout and fill in your details</li>
                  <li>Confirm your order (Cash on Delivery)</li>
                  <li>We'll contact you to confirm delivery time</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Delivery Areas</h3>
                <p className="text-gray-600">
                  We currently deliver within Sahiwal city and nearby areas. Delivery is free for orders above 1000 PKR.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Custom Orders</h3>
                <p className="text-gray-600">
                  Need a custom cake for a special occasion? Call us or send an email with your requirements, and we'll
                  create something special just for you!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
