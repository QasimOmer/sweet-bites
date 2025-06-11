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

  useEffect(() => {
    // Initialize auth only on client side
    if (typeof window === "undefined") {
      setLoading(false)
      return
    }

    let unsubscribe: (() => void) | undefined

    const initAuth = async () => {
      try {
        const { initializeApp, getApps } = await import("firebase/app")
        const { getAuth, onAuthStateChanged } = await import("firebase/auth")

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
        const auth = getAuth(app)

        unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
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
      } catch (error) {
        console.error("Error initializing auth:", error)
        setLoading(false)
      }
    }

    initAuth()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    if (typeof window === "undefined") throw new Error("Auth not available on server")

    const { getAuth, signInWithEmailAndPassword } = await import("firebase/auth")
    const { initializeApp, getApps } = await import("firebase/app")

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
    const auth = getAuth(app)
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (email: string, password: string, name: string) => {
    if (typeof window === "undefined") throw new Error("Auth not available on server")

    const { getAuth, createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth")
    const { initializeApp, getApps } = await import("firebase/app")

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
    const auth = getAuth(app)
    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(firebaseUser, { displayName: name })

    // Send welcome email
    if (firebaseUser.email) {
      try {
        const { sendWelcomeEmail } = await import("@/lib/email")
        await sendWelcomeEmail(firebaseUser.email, name)
      } catch (error) {
        console.error("Failed to send welcome email:", error)
      }
    }
  }

  const signOut = async () => {
    if (typeof window === "undefined") throw new Error("Auth not available on server")

    const { getAuth, signOut: firebaseSignOut } = await import("firebase/auth")
    const { initializeApp, getApps } = await import("firebase/app")

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
    const auth = getAuth(app)
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
