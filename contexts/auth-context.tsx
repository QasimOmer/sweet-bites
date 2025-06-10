"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Simple user interface without Firebase types
interface SimpleUser {
  uid: string
  email: string | null
  displayName: string | null
}

interface AuthContextType {
  user: SimpleUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SimpleUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState<any>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") {
      setLoading(false)
      return
    }

    // Dynamically import Firebase Auth only on client side
    const initAuth = async () => {
      try {
        const { initializeApp, getApps } = await import("firebase/app")
        const { getAuth, onAuthStateChanged } = await import("firebase/auth")

        const firebaseConfig = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAFFtYFlMI9PFqZW5HWbsiv2NAQvxYxKng",
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "the-cream-layer.firebaseapp.com",
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "the-cream-layer",
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "the-cream-layer.firebasestorage.app",
          messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "281475093052",
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:281475093052:web:e6ad430091e015621d6939",
        }

        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
        const authInstance = getAuth(app)
        setAuth(authInstance)

        const unsubscribe = onAuthStateChanged(authInstance, (firebaseUser) => {
          if (firebaseUser) {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
            })
          } else {
            setUser(null)
          }
          setLoading(false)
        })

        return unsubscribe
      } catch (error) {
        console.error("Error initializing auth:", error)
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!auth) throw new Error("Auth not initialized")

    const { signInWithEmailAndPassword } = await import("firebase/auth")
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (email: string, password: string, name: string) => {
    if (!auth) throw new Error("Auth not initialized")

    const { createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth")
    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(firebaseUser, { displayName: name })

    // Send welcome email (client-side only)
    if (typeof window !== "undefined" && firebaseUser.email) {
      try {
        const { sendWelcomeEmail } = await import("@/lib/email")
        await sendWelcomeEmail(firebaseUser.email, name)
      } catch (error) {
        console.error("Failed to send welcome email:", error)
      }
    }
  }

  const signOut = async () => {
    if (!auth) throw new Error("Auth not initialized")

    const { signOut: firebaseSignOut } = await import("firebase/auth")
    await firebaseSignOut(auth)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
