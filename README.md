This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
## Features

- **Clerk Authentication:** Secure user authentication and management using Clerk.
- **Supabase Integration:** Stores and logs reports and user actions in Supabase.
- **OpenAI Reports:** Generates detailed stock and crypto reports using OpenAI GPT.
- **Quiz Module:** Interactive quiz to help users determine their investor profile.
- **Dark Mode:** Toggle between light and dark themes for better accessibility.
- **Autocomplete Search:** Fast ticker search with autocomplete suggestions.

## Environment Variables

Make sure to set up the following environment variables in a `.env.local` file:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_key
```

## Backend Setup

If your app depends on a backend, start it with:

```bash
node server.js
```

## Usage

- Sign up or log in to access personalized features.
- Use the quiz to discover your investor profile.
- Search for tickers and generate AI-powered reports.
