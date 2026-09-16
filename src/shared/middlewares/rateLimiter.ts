import { NextRequest } from "next/server";
import { env } from "../config/env";

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const memoryStore = new Map<string, RateLimitRecord>();

export function checkRateLimit(req: NextRequest): { allowed: boolean; remaining: number; reset: number } {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  const now = Date.now();
  const windowMs = env.RATE_LIMIT_WINDOW_MS;
  const max = env.RATE_LIMIT_MAX_REQUESTS;

  const record = memoryStore.get(ip);

  if (!record || now > record.resetAt) {
    memoryStore.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { allowed: true, remaining: max - 1, reset: Math.ceil((now + windowMs) / 1000) };
  }

  if (record.count >= max) {
    return { allowed: false, remaining: 0, reset: Math.ceil(record.resetAt / 1000) };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: max - record.count,
    reset: Math.ceil(record.resetAt / 1000),
  };
}
