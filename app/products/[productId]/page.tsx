"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { getProducts } from "@/lib/firebase"
import type { Product } from "@/types"
import { ArrowLeft, Package, CheckCircle, List } from "lucide-react"
import Link from "next/link"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.productId as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState<string>("")
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getProducts()
        const foundProduct = products.find((p) => p.id === productId)
        setProduct(foundProduct || null)
        if (foundProduct?.variants && foundProduct.variants.length > 0) {
          setSelectedVariant(foundProduct.variants[0])
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleAddToCart = () => {
    if (!product) return

    const itemToAdd = {
      ...product,
      selectedVariant: selectedVariant || undefined,
    }

    addItem(itemToAdd)
    toast({
      title: "Added to cart",
      description: `${product.name}${selectedVariant ? ` (${selectedVariant})` : ""} has been added to your cart.`,
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading product details...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <Link href="/products">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products" className="inline-flex items-center mb-6 text-primary hover:underline">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={600}
            height={600}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.featured && <Badge className="bg-orange-500">Featured</Badge>}
              {product.inStock && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  In Stock
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
          </div>

          {product.weight && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-gray-400" />
                  <span className="font-semibold">Weight:</span>
                  <span>{product.weight}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {product.ingredients && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <List className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <span className="font-semibold">Ingredients:</span>
                    <p className="text-gray-600 mt-1">{product.ingredients}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {product.variants && product.variants.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Choose a variant:</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <Button
                    key={variant}
                    variant={selectedVariant === variant ? "default" : "outline"}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-bold text-primary">{product.price.toLocaleString()} PKR</span>
            </div>
            <Button onClick={handleAddToCart} size="lg" className="w-full" disabled={!product.inStock}>
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
