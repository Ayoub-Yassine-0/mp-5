# CS 391 URL Shortener

Shorten links with a custom alias. Visit `YOUR-APP.COM/alias` and you are
redirected to the original link.

Built with Next.js (App Router) and MongoDB, using only the patterns from
the lecture slides and the discussion project.

## How it works

- `db.ts` — MongoDB connection helper, same pattern as the discussion
  project. The connection string comes from `MONGO_URI` in `.env.local`
  and is never exposed to the client (Lecture 16).
- `lib/createShortUrl.ts` — server action (`"use server"`, discussion
  project). Validates the URL and the alias on the backend with
  `String.startsWith` and `String.includes` (Lecture 3), rejects an alias
  that is already taken with `findOne`, and inserts one document with
  `insertOne` (discussion project).
- `lib/getUrlByAlias.ts` — server action that reads one document back
  with `findOne` (discussion project).
- `components/ShortenerForm.tsx` — client component (`"use client"`,
  Lecture 13) using `useState` (Lecture 7). Calls the server action and
  shows the full shortened URL as a link on the page, built with
  `window.location.origin` (Lecture 3).
- `app/[alias]/page.tsx` — dynamic route (Lecture 12). Reads the alias
  with `useParams()` (Lecture 12) inside a `Suspense` boundary
  (Lecture 10), looks it up with `useEffect` (Lecture 7), and sends the
  browser to the original link with `window.location.href` (Lecture 3).

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
