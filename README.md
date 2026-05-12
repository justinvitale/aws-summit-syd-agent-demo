# ▲ Shop

The official Vercel merchandise storefront. Built with Next.js App Router,
React Server Components, and Tailwind CSS v4. Product data is provided by the
[Fake Store API](https://fakestoreapi.com).

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Stack

- Next.js 16 (App Router, RSC)
- React 19
- Tailwind CSS v4
- Geist Sans & Geist Mono
- TypeScript

## Project structure

```
app/
├── components/     UI components (header, footer, cards, etc.)
├── lib/            API client + types
├── products/[id]/  Product detail page
├── layout.tsx      Root layout
└── page.tsx        Home / product listing
```

## Deployment

This project is intended to deploy on Vercel. Push to the connected
repository and Vercel will build and deploy automatically.
