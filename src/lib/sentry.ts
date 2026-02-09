/**
 * Sentry initialization for SignalDesk Pro.
 * In production, @sentry/nextjs auto-instruments via next.config.js.
 * This module provides manual capture helpers.
 */

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN ?? "";

let _sentry: typeof import("@sentry/nextjs") | null = null;

async function getSentry() {
  if (_sentry) return _sentry;
  if (!SENTRY_DSN) return null;
  try {
    const mod = await import("@sentry/nextjs");
    _sentry = mod;
    return _sentry;
  } catch {
    return null;
  }
}

export async function captureException(
  err: unknown,
): Promise<void> {
  const sentry = await getSentry();
  if (sentry) {
    sentry.captureException(err);
  } else {
    console.error("[sentry:fallback]", err);
  }
}

export async function captureMessage(
  msg: string,
  level: "info" | "warning" | "error" = "info",
): Promise<void> {
  const sentry = await getSentry();
  if (sentry) {
    sentry.captureMessage(msg, level);
  } else {
    console.log(`[sentry:fallback:${level}]`, msg);
  }
}
