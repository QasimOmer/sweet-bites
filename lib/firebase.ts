import type { Product } from "@/types"

// Sample products data with updated signature cake image
const sampleProducts: Omit<Product, "id">[] = [
  {
    name: "Sweet Bites Signature Cake",
    description:
      "The Sweet Bites Cake is a luscious, multi-layered treat with velvety sponge, cream cheese frosting, and rich white chocolate cream. A rich, creamy cake made with flour, sugar, butter, eggs, milk, and vanilla, layered with whipped cream cheese frosting, white chocolate chips, and fresh strawberries for a luxurious, indulgent treat.",
    price: 2500,
    weight: "1 kg",
    ingredients:
      "Flour, sugar, butter, eggs, milk, vanilla, whipped cream cheese frosting, white chocolate chips, fresh strawberries",
    image: "/images/hero-cake.jpg",
    category: "cakes",
    featured: true,
    inStock: true,
  },
  {
    name: "Brownie Galaxy",
    description:
      "A rich, cosmic swirl of dark chocolate, fudge, and stars of white chocolate chips. Every bite takes you out of this world.",
    price: 200,
    weight: "200g",
    ingredients:
      "Dark chocolate, cocoa powder, all-purpose flour, granulated sugar, brown sugar, eggs, butter, vanilla extract, salt, baking powder, white chocolate chips, chocolate chunks, espresso powder, and a sprinkle of edible glitter",
    image: "/images/brownies.jpg",
    category: "brownies",
    featured: false,
    inStock: true,
  },
  {
    name: "DoughJoy",
    description:
      "Soft, fluffy, and irresistibly sweet, DoughJoy donuts are crafted to bring happiness in every bite. Perfectly golden and freshly made, they're your go-to treat anytime, any day.",
    price: 150,
    weight: "100g",
    ingredients:
      "All-purpose flour, sugar, yeast, milk, eggs, unsalted butter, salt, vanilla extract, vegetable oil (for frying), and a touch of cinnamon or glaze for finishing",
    image: "/images/donuts.jpg",
    category: "donuts",
    featured: false,
    inStock: true,
    variants: ["Cream-Filled", "Sprinkle Donut"],
  },
  {
    name: "Cup Cakes",
    description:
      "Our cupcakes are moist, fluffy, and bursting with flavor. Each one is lovingly baked and topped with smooth, creamy frosting—perfect for any occasion or sweet craving!",
    price: 150,
    weight: "70g - 100g",
    ingredients:
      "All-purpose flour, granulated sugar, baking powder, salt, unsalted butter, eggs, whole milk, vanilla extract, powdered sugar (for frosting), heavy cream or butter (for frosting), and optional flavorings like cocoa powder, fruit puree, or spices",
    image: "/images/cupcakes.jpg",
    category: "cupcakes",
    featured: false,
    inStock: true,
  },
  {
    name: "Double Chocolate Delight",
    description:
      "A rich and moist chocolate cake layered with decadent chocolate ganache and topped with creamy chocolate frosting. Perfect for true chocolate lovers craving an intense, indulgent treat.",
    price: 2999,
    weight: "2kg",
    ingredients:
      "All-purpose flour, cocoa powder, baking powder, baking soda, salt, granulated sugar, unsalted butter, eggs, vanilla extract, buttermilk, hot water, semi-sweet chocolate chips, heavy cream (for ganache), powdered sugar (for frosting), and cocoa powder (for frosting)",
    image: "/images/double-chocolate-delight.jpg",
    category: "cakes",
    featured: true,
    inStock: true,
  },
]

export async function getProducts(): Promise<Product[]> {
  if (typeof window === "undefined") {
    // Server-side: return sample products
    return sampleProducts.map((product, index) => ({
      ...product,
      id: `sample-${index}`,
    }))
  }

  try {
    // Client-side: try to get from Firebase
    const { initializeApp, getApps } = await import("firebase/app")
    const { getFirestore, collection, getDocs } = await import("firebase/firestore")

    const firebaseConfig = {
      apiKey: "AIzaSyAFFtYFlMI9PFqZW5HWbsiv2NAQvxYxKng",
      authDomain: "the-cream-layer.firebaseapp.com",
      projectId: "the-cream-layer",
      storageBucket: "the-cream-layer.firebasestorage.app",
      messagingSenderId: "281475093052",
      appId: "1:281475093052:web:e6ad430091e015621d6939",
      measurementId: "G-51M6X4DJ2R",
    }

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
    const db = getFirestore(app)

    const querySnapshot = await getDocs(collection(db, "products"))
    const products: Product[] = []

    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product)
    })

    // If no products in database, return sample products
    if (products.length === 0) {
      return sampleProducts.map((product, index) => ({
        ...product,
        id: `sample-${index}`,
      }))
    }

    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    // Return sample products as fallback
    return sampleProducts.map((product, index) => ({
      ...product,
      id: `sample-${index}`,
    }))
  }
}

export async function createOrder(orderData: any): Promise<string> {
  if (typeof window === "undefined") {
    throw new Error("Orders can only be created on the client side")
  }

  try {
    const { initializeApp, getApps } = await import("firebase/app")
    const { getFirestore, collection, addDoc } = await import("firebase/firestore")

    const firebaseConfig = {
      apiKey: "AIzaSyAFFtYFlMI9PFqZW5HWbsiv2NAQvxYxKng",
      authDomain: "the-cream-layer.firebaseapp.com",
      projectId: "the-cream-layer",
      storageBucket: "the-cream-layer.firebasestorage.app",
      messagingSenderId: "281475093052",
      appId: "1:281475093052:web:e6ad430091e015621d6939",
      measurementId: "G-51M6X4DJ2R",
    }

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
    const db = getFirestore(app)

    const docRef = await addDoc(collection(db, "orders"), orderData)
    console.log("Order created:", docRef.id, orderData)
    return docRef.id
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

export async function getOrder(orderId: string) {
  if (typeof window === "undefined") {
    throw new Error("Orders can only be fetched on the client side")
  }

  try {
    const { initializeApp, getApps } = await import("firebase/app")
    const { getFirestore, doc, getDoc } = await import("firebase/firestore")

    const firebaseConfig = {
      apiKey: "AIzaSyAFFtYFlMI9PFqZW5HWbsiv2NAQvxYxKng",
      authDomain: "the-cream-layer.firebaseapp.com",
      projectId: "the-cream-layer",
      storageBucket: "the-cream-layer.firebasestorage.app",
      messagingSenderId: "281475093052",
      appId: "1:281475093052:web:e6ad430091e015621d6939",
      measurementId: "G-51M6X4DJ2R",
    }

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
    const db = getFirestore(app)

    const docRef = doc(db, "orders", orderId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    } else {
      throw new Error("Order not found")
    }
  } catch (error) {
    console.error("Error fetching order:", error)
    throw error
  }
}

export async function getAllOrders() {
  if (typeof window === "undefined") {
    throw new Error("Orders can only be fetched on the client side")
  }

  try {
    const { initializeApp, getApps } = await import("firebase/app")
    const { getFirestore, collection, getDocs } = await import("firebase/firestore")

    const firebaseConfig = {
      apiKey: "AIzaSyAFFtYFlMI9PFqZW5HWbsiv2NAQvxYxKng",
      authDomain: "the-cream-layer.firebaseapp.com",
      projectId: "the-cream-layer",
      storageBucket: "the-cream-layer.firebasestorage.app",
      messagingSenderId: "281475093052",
      appId: "1:281475093052:web:e6ad430091e015621d6939",
      measurementId: "G-51M6X4DJ2R",
    }

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
    const db = getFirestore(app)

    const querySnapshot = await getDocs(collection(db, "orders"))
    const orders: any[] = []

    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() })
    })

    // Sort by creation date (newest first)
    orders.sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt)
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt)
      return dateB.getTime() - dateA.getTime()
    })

    return orders
  } catch (error) {
    console.error("Error fetching orders:", error)
    throw error
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  if (typeof window === "undefined") {
    throw new Error("Orders can only be updated on the client side")
  }

  try {
    const { initializeApp, getApps } = await import("firebase/app")
    const { getFirestore, doc, updateDoc } = await import("firebase/firestore")

    const firebaseConfig = {
      apiKey: "AIzaSyAFFtYFlMI9PFqZW5HWbsiv2NAQvxYxKng",
      authDomain: "the-cream-layer.firebaseapp.com",
      projectId: "the-cream-layer",
      storageBucket: "the-cream-layer.firebasestorage.app",
      messagingSenderId: "281475093052",
      appId: "1:281475093052:web:e6ad430091e015621d6939",
      measurementId: "G-51M6X4DJ2R",
    }

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
    const db = getFirestore(app)

    const orderRef = doc(db, "orders", orderId)
    await updateDoc(orderRef, {
      status,
      updatedAt: new Date(),
    })
  } catch (error) {
    console.error("Error updating order status:", error)
    throw error
  }
}
