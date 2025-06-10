"use client"

import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { firebaseConfig } from "./firebase-config"

// Initialize Firebase app for client-side auth
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Auth (client-side only)
export const auth = getAuth(app)
