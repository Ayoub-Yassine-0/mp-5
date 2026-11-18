"use client";
import { useState } from "react";
import createShortUrl from "@/lib/createShortUrl";
import styles from "./ShortenerForm.module.css";

export default function ShortenerForm() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setShortUrl("");
    setCopied(false);
    setSaving(true);

    const result = await createShortUrl(url, alias);
    setSaving(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setShortUrl(`${window.location.origin}/${result.alias}`);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Link to shorten
        <input
          className={styles.input}
          type="url"
          placeholder="https://example.com/a/very/long/link"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          required
        />
      </label>
      <label className={styles.label}>
        Alias
        <input
          className={styles.input}
          type="text"
          placeholder="my-link"
          value={alias}
          onChange={(event) => setAlias(event.target.value)}
          required
        />
      </label>
      <button className={styles.button} type="submit" disabled={saving}>
        {saving ? "Saving..." : "Shorten"}
      </button>

      {error !== "" && <p className={styles.error}>{error}</p>}

      {shortUrl !== "" && (
        <div className={styles.result}>
          <p>Your shortened URL:</p>
          <a
            className={styles.shortUrl}
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
          >
            {shortUrl}
          </a>
          <button
            className={styles.copyButton}
            type="button"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </form>
  );
}
