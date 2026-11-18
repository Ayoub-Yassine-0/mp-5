"use server";
import getCollection, { LINKS_COLLECTION } from "@/db";

export type CreateShortUrlResult =
  | { ok: true; alias: string }
  | { ok: false; error: string };

const ALIAS_PATTERN = /^[a-zA-Z0-9-_]{1,50}$/;

function isValidUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export default async function createShortUrl(
  url: string,
  alias: string,
): Promise<CreateShortUrlResult> {
  const cleanUrl = url.trim();
  const cleanAlias = alias.trim();

  if (!isValidUrl(cleanUrl)) {
    return {
      ok: false,
      error: "Please enter a valid URL starting with http:// or https://",
    };
  }

  if (!ALIAS_PATTERN.test(cleanAlias)) {
    return {
      ok: false,
      error:
        "Alias can only use letters, numbers, dashes, and underscores (1-50 characters)",
    };
  }

  const linksCollection = await getCollection(LINKS_COLLECTION);
  const existing = await linksCollection.findOne({ alias: cleanAlias });
  if (existing) {
    return {
      ok: false,
      error: "That alias is already taken. Please choose another one.",
    };
  }

  const res = await linksCollection.insertOne({
    alias: cleanAlias,
    url: cleanUrl,
    createdAt: new Date(),
  });

  if (!res.acknowledged) {
    return {
      ok: false,
      error: "Something went wrong while saving your link. Please try again.",
    };
  }

  return { ok: true, alias: cleanAlias };
}
