// This script seeds the Firebase Firestore with sample products
// Run this after setting up your Firebase project

import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAFFtYFlMI9PFqZW5HWbsiv2NAQvxYxKng",
  authDomain: "the-cream-layer.firebaseapp.com",
  projectId: "the-cream-layer",
  storageBucket: "the-cream-layer.firebasestorage.app",
  messagingSenderId: "281475093052",
  appId: "1:281475093052:web:e6ad430091e015621d6939",
  measurementId: "G-51M6X4DJ2R"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const products = [
  {
    name: "Delicious Cakes",
    description:
      "Our signature multi-layer cake with rich cream and fresh fruits. Perfect for celebrations and special occasions.",
    price: 2500,
    image: "/placeholder.svg?height=300&width=300",
    category: "cakes",
    featured: true,
  },
  {
    name: "Brownie Galaxy",
    description: "Fudgy chocolate brownies with a cosmic twist. Rich, decadent, and absolutely irresistible.",
    price: 200,
    image: "/placeholder.svg?height=300&width=300",
    category: "brownies",
    featured: false,
  },
  {
    name: "DoughJoy",
    description: "Freshly baked donuts with various glazes and toppings. A perfect treat for any time of day.",
    price: 150,
    image: "/placeholder.svg?height=300&width=300",
    category: "donuts",
    featured: false,
  },
  {
    name: "Cup Cakes",
    description: "Delightful cupcakes with fluffy frosting in various flavors. Perfect for parties and gifts.",
    price: 150,
    image: "/placeholder.svg?height=300&width=300",
    category: "cupcakes",
    featured: false,
  },
  {
    name: "Double Chocolate Delight",
    description: "Ultimate chocolate experience with double chocolate layers, ganache, and chocolate chips.",
    price: 2999,
    image: "/placeholder.svg?height=300&width=300",
    category: "cakes",
    featured: true,
  },
]

async function seedProducts() {
  try {
    console.log("Starting to seed products...")

    for (const product of products) {
      const docRef = await addDoc(collection(db, "products"), product)
      console.log(`Added product: ${product.name} with ID: ${docRef.id}`)
    }

    console.log("Successfully seeded all products!")
  } catch (error) {
    console.error("Error seeding products:", error)
  }
}

seedProducts()
