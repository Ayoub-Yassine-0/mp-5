import Link from "next/link";
import { redirect } from "next/navigation";
import getUrlByAlias from "@/lib/getUrlByAlias";
import styles from "../page.module.css";

export const instant = false;

export default async function AliasPage({
  params,
}: {
  params: Promise<{ alias: string }>;
}) {
  const { alias } = await params;
  const url = await getUrlByAlias(alias);

  if (!url) {
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>Alias not found</h1>
        <p className={styles.subtitle}>
          No link exists for &quot;{alias}&quot; yet.
        </p>
        <Link className={styles.homeLink} href="/">
          Create a shortened link
        </Link>
      </main>
    );
  }

  redirect(url);
}
