import Redis from "ioredis";
import { env } from "../config/env";
import { logger } from "../utils/logger";

class CacheService {
  private redis: Redis | null = null;
  private memoryCache = new Map<string, { value: any; expiry: number }>();

  constructor() {
    try {
      this.redis = new Redis(env.REDIS_URL, {
        lazyConnect: true,
        maxRetriesPerRequest: 1,
        retryStrategy: () => null,
      });
      this.redis.on("error", () => {
        // Suppress unhandled error events in dev when Redis is not running
      });
      this.redis.connect().catch(() => {
        logger.info("Redis not active. CacheService using in-memory store.");
      });
    } catch {
      // Use memory cache
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      if (this.redis && this.redis.status === "ready") {
        const val = await this.redis.get(key);
        return val ? JSON.parse(val) : null;
      }
    } catch {}

    const cached = this.memoryCache.get(key);
    if (cached) {
      if (Date.now() < cached.expiry) {
        return cached.value;
      }
      this.memoryCache.delete(key);
    }
    return null;
  }

  async set(key: string, value: any, ttlSeconds: number = env.REDIS_CACHE_TTL_SECONDS): Promise<void> {
    try {
      if (this.redis && this.redis.status === "ready") {
        await this.redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
        return;
      }
    } catch {}

    this.memoryCache.set(key, {
      value,
      expiry: Date.now() + ttlSeconds * 1000,
    });
  }

  async del(key: string): Promise<void> {
    try {
      if (this.redis && this.redis.status === "ready") {
        await this.redis.del(key);
      }
    } catch {}
    this.memoryCache.delete(key);
  }

  async invalidatePattern(pattern: string): Promise<void> {
    try {
      if (this.redis && this.redis.status === "ready") {
        const keys = await this.redis.keys(pattern);
        if (keys.length > 0) {
          await this.redis.del(...keys);
        }
      }
    } catch {}

    for (const k of this.memoryCache.keys()) {
      if (k.includes(pattern.replace(/\*/g, ""))) {
        this.memoryCache.delete(k);
      }
    }
  }
}

export const cacheService = new CacheService();
