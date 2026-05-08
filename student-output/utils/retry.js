// Wraps an async API call with exponential backoff.
// Retries on 529 (overloaded), 503 (unavailable), 429 (rate limited),
// and transient network errors. All other errors throw immediately.
//
// Used to absorb Anthropic capacity blips so a single 529 doesn't kill
// a multi-call orchestrator run.

export async function withRetry(fn, { maxAttempts = 3, baseDelayMs = 1000 } = {}) {
  let lastErr;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const status = err?.status ?? err?.response?.status;
      const code = err?.code;
      const isRetryable =
        status === 529 ||
        status === 503 ||
        status === 429 ||
        code === "ECONNRESET" ||
        code === "ETIMEDOUT" ||
        code === "ENOTFOUND";
      if (!isRetryable || attempt === maxAttempts) throw err;
      const delay = baseDelayMs * Math.pow(2, attempt - 1); // 1s, 2s, 4s
      console.warn(`  ⚠️  API ${status || code}, retry ${attempt}/${maxAttempts - 1} in ${delay}ms`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastErr;
}
