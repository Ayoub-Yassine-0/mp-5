import getCollection, { LINKS_COLLECTION } from "@/db";

export default async function getUrlByAlias(
  alias: string,
): Promise<string | null> {
  const linksCollection = await getCollection(LINKS_COLLECTION);
  const doc = await linksCollection.findOne({ alias });
  if (!doc || typeof doc.url !== "string") {
    return null;
  }
  return doc.url;
}
