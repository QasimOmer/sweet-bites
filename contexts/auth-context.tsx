"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { sendWelcomeEmail } from "@/lib/email"

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
    // Dynamically import Firebase Auth only on client side
    const initAuth = async () => {
      if (typeof window === "undefined") {
        setLoading(false)
        return
      }

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

    // Send welcome email
    if (firebaseUser.email) {
      await sendWelcomeEmail(firebaseUser.email, name)
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
