# CS 391 URL Shortener

Shorten links with a custom alias. Visit `YOUR-APP.COM/alias` and you are
redirected to the original link.

Built with Next.js (App Router) and MongoDB, using only the patterns from
the CS 303 lecture slides and the CS 391 discussion project.

## How it works

- `db.ts` — MongoDB connection helper, same pattern as the discussion
  project. The connection string comes from `MONGO_URI` in `.env.local`
  and is never exposed to the client (Lectures 12 and 16).
- `lib/createShortUrl.ts` — server action (`"use server"`). Validates the
  URL and the alias on the backend, rejects an alias that is already taken,
  and inserts one document into the `links` collection (Lectures 13, 16, 18).
- `lib/getUrlByAlias.ts` — server function that reads one document back
  with `findOne` (Lecture 16).
- `components/ShortenerForm.tsx` — client component (`"use client"`, needed
  for React hooks). Calls the server action and shows the shortened URL
  with a copy button (Lecture 13).
- `app/[alias]/page.tsx` — dynamic route (Lecture 12). Looks the alias up
  on the server and calls `redirect()` from `next/navigation`, so visiting
  the short link redirects with nothing to click.

## Setup

1. `npm install`
2. Put your MongoDB Atlas connection string in `.env.local` as `MONGO_URI`
   (Lecture 16: create a free cluster, add a database user, copy the
   connection string from Connect > Drivers, replace `<db_password>`).
   `.env.local` is gitignored, so the secret never reaches GitHub.
3. `npm run dev` and open http://localhost:3000

## Deploying to Vercel

Add `MONGO_URI` as an environment variable in the Vercel project settings
so the deployed version can reach the database, and enable network access
from any IP address (0.0.0.0/0) in Atlas.
