"use server";
import getCollection, { LINKS_COLLECTION } from "@/db";

export type CreateShortUrlResult =
  | { ok: true; alias: string }
  | { ok: false; error: string };

const ALLOWED_ALIAS_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";

function isValidUrl(value: string): boolean {
  return value.startsWith("http://") || value.startsWith("https://");
}

function isValidAlias(value: string): boolean {
  if (value.length < 1 || value.length > 50) {
    return false;
  }
  for (const ch of value) {
    if (!ALLOWED_ALIAS_CHARS.includes(ch)) {
      return false;
    }
  }
  return true;
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

  if (!isValidAlias(cleanAlias)) {
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
  });

  if (!res.acknowledged) {
    return {
      ok: false,
      error: "Something went wrong while saving your link. Please try again.",
    };
  }

  return { ok: true, alias: cleanAlias };
}
