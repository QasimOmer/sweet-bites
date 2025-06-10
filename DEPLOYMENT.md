# Sweet Bites - Deployment Instructions

## 🚀 Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free)
- Firebase project set up

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Push your code to the repository:
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/sweet-bites.git
   git push -u origin main
   \`\`\`

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave empty (default)

### Step 3: Add Environment Variables
In Vercel dashboard, go to your project → Settings → Environment Variables and add:

\`\`\`
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAFFtYFlMI9PFqZW5HWbsiv2NAQvxYxKng
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=the-cream-layer.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=the-cream-layer
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=the-cream-layer.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=281475093052
NEXT_PUBLIC_FIREBASE_APP_ID=1:281475093052:web:e6ad430091e015621d6939
\`\`\`

### Step 4: Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Your website will be live at `https://your-project-name.vercel.app`

## 🔧 Firebase Setup

### Enable Authentication
1. Go to [Firebase Console](https://console.firebase.google.com/project/the-cream-layer)
2. Navigate to Authentication → Sign-in method
3. Enable "Email/Password" provider
4. Click "Save"

### Create Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Choose "Start in test mode"
4. Select your preferred location (closest to your users)
5. Click "Done"

### Set Firestore Security Rules
1. Go to Firestore Database → Rules
2. Replace the rules with:

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

3. Click "Publish"

## 📧 Email Configuration (Optional)

To enable order confirmation emails:

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Add to Vercel environment variables:
   \`\`\`
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=abdulmoeez644@gmail.com
   SMTP_PASS=your_generated_app_password
   \`\`\`

## 🎯 Testing Your Deployment

1. Visit your deployed website
2. Test user registration/login
3. Add products to cart
4. Complete a test order
5. Login as admin (abdulmoeez644@gmail.com) to view orders

## 🔄 Updates and Maintenance

To update your website:
1. Make changes to your code
2. Push to GitHub:
   \`\`\`bash
   git add .
   git commit -m "Update description"
   git push
   \`\`\`
3. Vercel will automatically redeploy

## 🆘 Troubleshooting

### Common Issues:
1. **Build fails**: Check that all dependencies are in package.json
2. **Firebase errors**: Verify environment variables are correct
3. **Images not loading**: Ensure image files are in the correct directory
4. **Admin access denied**: Make sure you're logged in with abdulmoeez644@gmail.com

### Support:
- Vercel Documentation: https://vercel.com/docs
- Firebase Documentation: https://firebase.google.com/docs
- Next.js Documentation: https://nextjs.org/docs

Your Sweet Bites website is now ready for customers! 🎂
