"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

function EmailJSInitializer() {
  useEffect(() => {
    // Initialize EmailJS on the client side
    const initEmailJS = async () => {
      const { initEmailJS } = await import("@/lib/email")
      initEmailJS()
    }
    initEmailJS()
  }, [])

  return null
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <EmailJSInitializer />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
