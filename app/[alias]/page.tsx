"use client";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import getUrlByAlias from "@/lib/getUrlByAlias";
import styles from "../page.module.css";

function AliasLookup() {
  const params = useParams();
  const alias = params.alias as string;
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function go() {
      const url = await getUrlByAlias(alias);
      if (url) {
        window.location.href = url;
      } else {
        setNotFound(true);
      }
    }
    go();
  }, [alias]);

  if (notFound) {
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>Alias not found</h1>
        <p className={styles.subtitle}>
          No link exists for &quot;{alias}&quot; yet.
        </p>
        <a className={styles.homeLink} href="/">
          Create a shortened link
        </a>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <p className={styles.subtitle}>Redirecting...</p>
    </main>
  );
}

export default function AliasPage() {
  return (
    <Suspense
      fallback={
        <main className={styles.main}>
          <p className={styles.subtitle}>Redirecting...</p>
        </main>
      }
    >
      <AliasLookup />
    </Suspense>
  );
}
