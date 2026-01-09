# PARCELSCRIBE

Next.js (App Router) app for building claim packets with Supabase auth/storage, server-side PDF generation, and Stripe checkout for paid downloads.

## Local setup

1. Install deps: npm install
2. Run dev server: npm run dev

## Required environment variables

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
- SUPABASE_SERVICE_ROLE_KEY (for Stripe webhook writes)
- APP_URL (e.g., http://localhost:3000)
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET

