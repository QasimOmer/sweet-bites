// This script seeds the Firebase Firestore with sample products
// Run this after setting up your Firebase project
// Use: node scripts/seed-products.cjs

const { initializeApp } = require("firebase/app")
const { getFirestore, collection, addDoc } = require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyAFFtYFlMI9PFqZW5HWbsiv2NAQvxYxKng",
  authDomain: "the-cream-layer.firebaseapp.com",
  projectId: "the-cream-layer",
  storageBucket: "the-cream-layer.firebasestorage.app",
  messagingSenderId: "281475093052",
  appId: "1:281475093052:web:e6ad430091e015621d6939",
  measurementId: "G-51M6X4DJ2R",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const products = [
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

async function seedProducts() {
  try {
    console.log("Starting to seed products...")

    for (const product of products) {
      const docRef = await addDoc(collection(db, "products"), product)
      console.log(`Added product: ${product.name} with ID: ${docRef.id}`)
    }

    console.log("Successfully seeded all products!")
    console.log("You can now view your products on the website!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding products:", error)
    process.exit(1)
  }
}

seedProducts()
