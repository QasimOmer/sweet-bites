# Firebase Setup Instructions for Sweet Bites

## 🔥 Step 1: Enable Authentication

1. Go to your Firebase Console: https://console.firebase.google.com/project/the-cream-layer
2. Click on **Authentication** in the left sidebar
3. Click **Get started** if you haven't set it up yet
4. Go to **Sign-in method** tab
5. Click on **Email/Password**
6. Toggle **Enable** to ON
7. Click **Save**

## 🗄️ Step 2: Create Firestore Database

1. In Firebase Console, click on **Firestore Database** in the left sidebar
2. Click **Create database**
3. Choose **Start in test mode** (we'll secure it later)
4. Select your location (choose closest to Pakistan, like `asia-south1` for Mumbai)
5. Click **Done**

## 🔒 Step 3: Set Firestore Security Rules

1. In Firestore Database, go to the **Rules** tab
2. Replace the existing rules with:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to products for everyone
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "abdulmoeez644@gmail.com";
    }
    
    // Allow users to create orders and admins to read/update them
    match /orders/{document} {
      allow create: if true;
      allow read, update: if request.auth != null && request.auth.token.email == "abdulmoeez644@gmail.com";
    }
  }
}
\`\`\`

3. Click **Publish**

## 📊 Step 4: Test Your Setup

1. Your website should now work with Firebase
2. Try creating an account
3. Try adding products to cart
4. Try placing an order
5. Login with your admin email (abdulmoeez644@gmail.com) to see orders

## 🚀 Step 5: Deploy to Vercel

Your Firebase is now ready! You can deploy to Vercel:

1. Push your code to GitHub
2. Connect to Vercel
3. Add environment variables (already configured in the code)
4. Deploy!

## 🔧 Optional: Add Sample Products to Database

If you want to add products directly to Firestore instead of using the sample data:

1. Go to Firestore Database
2. Click **Start collection**
3. Collection ID: `products`
4. Add documents with these fields:
   - name (string)
   - description (string)
   - price (number)
   - weight (string)
   - ingredients (string)
   - image (string)
   - category (string)
   - featured (boolean)
   - inStock (boolean)
   - variants (array) - optional

## 📧 Email Configuration (Optional)

To enable order confirmation emails:
1. Enable 2-factor authentication on Gmail
2. Generate App Password
3. Add to Vercel environment variables:
   - SMTP_HOST=smtp.gmail.com
   - SMTP_PORT=587
   - SMTP_USER=abdulmoeez644@gmail.com
   - SMTP_PASS=your_app_password

Your Sweet Bites website is now fully configured! 🎂
