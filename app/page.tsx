import ShortenerForm from "@/components/ShortenerForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>URL Shortener</h1>
      <p className={styles.subtitle}>
        Paste a long link, pick an alias, and share the short version.
      </p>
      <ShortenerForm />
    </main>
  );
}
