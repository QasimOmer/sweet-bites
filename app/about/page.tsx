import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Sweet Bites</h1>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <Image
              src="/images/hero-cake.jpg"
              alt="Sweet Bites bakery - delicious homemade cakes"
              width={500}
              height={400}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p className="text-gray-600">
              Sweet Bites was born from a passion for creating exceptional baked goods that bring joy to every
              celebration. Located in the heart of Sahiwal, we've been serving our community with love-filled treats
              since our inception.
            </p>
            <p className="text-gray-600">
              Every cake, brownie, and cupcake is handcrafted using premium ingredients and traditional techniques
              passed down through generations. We believe that great baking starts with great ingredients and ends with
              happy customers.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <Image
                  src="/images/cupcakes.jpg"
                  alt="Fresh ingredients"
                  width={80}
                  height={80}
                  className="mx-auto rounded-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600">We source only the finest, freshest ingredients for all our products.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <Image
                  src="/images/brownies.jpg"
                  alt="Handcrafted treats"
                  width={80}
                  height={80}
                  className="mx-auto rounded-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2">Handcrafted</h3>
              <p className="text-gray-600">Every item is carefully made by hand with attention to detail.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <Image
                  src="/images/donuts.jpg"
                  alt="Local delivery"
                  width={80}
                  height={80}
                  className="mx-auto rounded-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2">Local Delivery</h3>
              <p className="text-gray-600">Fresh delivery right to your doorstep in Sahiwal and surrounding areas.</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            To create memorable moments through exceptional baked goods, bringing families and friends together one
            delicious bite at a time. We're not just a bakery – we're part of your celebrations, big and small.
          </p>
        </div>
      </div>
    </div>
  )
}
