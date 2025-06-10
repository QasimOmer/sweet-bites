"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/types"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Package, CheckCircle } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            {product.featured && <Badge className="bg-orange-500">Featured</Badge>}
            {product.inStock && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                In Stock
              </Badge>
            )}
          </div>
          {product.weight && (
            <Badge className="absolute top-2 right-2 bg-blue-100 text-blue-800">
              <Package className="h-3 w-3 mr-1" />
              {product.weight}
            </Badge>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          {product.variants && (
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">Available variants:</p>
              <div className="flex flex-wrap gap-1">
                {product.variants.map((variant) => (
                  <Badge key={variant} variant="outline" className="text-xs">
                    {variant}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">{product.price.toLocaleString()} PKR</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button onClick={handleAddToCart} className="flex-1" disabled={!product.inStock}>
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
        <Link href={`/products/${product.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
