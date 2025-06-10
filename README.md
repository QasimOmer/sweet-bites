# The Cream Layer - Home Bakery Website

A modern, responsive ecommerce website for The Cream Layer home bakery in Sahiwal, Pakistan. Built with Next.js, Firebase, and Tailwind CSS.

## Features

- 🛒 Complete shopping cart functionality
- 🔐 User authentication (login/signup)
- 📱 Responsive design for all devices
- 💳 Cash on delivery payment system
- 📧 Email order confirmations
- 🎂 Product catalog with categories
- 🏪 Modern, beautiful UI with shadcn/ui components
- 🚚 Order tracking and management
- 📍 Local delivery in Sahiwal area

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Firebase (Firestore, Authentication)
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project set up
- Gmail account for email notifications

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Copy your Firebase config

4. Create `.env.local` file and add your Firebase configuration:
   \`\`\`env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
   \`\`\`

5. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Seeding Products

Run the product seeding script to populate your Firestore database:
\`\`\`bash
node scripts/seed-products.js
\`\`\`

## Deployment

This project is ready to deploy on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

## Business Information

- **Name**: The Cream Layer
- **Location**: 48 C Rafi Garden Sahiwal, 57000
- **Contact**: 03036580198
- **Email**: abdulmoeez644@gmail.com

## Products

- Delicious Cakes (2,500 PKR)
- Brownie Galaxy (200 PKR)
- DoughJoy Donuts (150 PKR)
- Cup Cakes (150 PKR)
- Double Chocolate Delight (2,999 PKR)

## License

© 2025 The Cream Layer. All rights reserved.
