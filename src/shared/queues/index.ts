import { Queue, Worker, Job } from "bullmq";
import Redis from "ioredis";
import { env } from "../config/env";
import { logger } from "../utils/logger";

let redisConnection: Redis | null = null;
let isRedisAvailable = false;

try {
  redisConnection = new Redis(env.REDIS_URL, {
    lazyConnect: true,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    retryStrategy: () => null,
  });

  redisConnection.on("connect", () => {
    isRedisAvailable = true;
    logger.info("Connected to Redis for BullMQ queues and caching.");
  });

  redisConnection.on("error", (err) => {
    isRedisAvailable = false;
    // Suppress repeated error spam in dev if Redis container is not active
  });
} catch {
  isRedisAvailable = false;
}

export interface JobPayload {
  type: string;
  payload: any;
}

// Memory Queue Fallback
class InMemoryQueue {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  async add(name: string, data: any) {
    logger.info({ queue: this.name, job: name }, `[In-Memory Queue] Dispatching job: ${name}`);
    // Simulate immediate asynchronous execution
    setTimeout(async () => {
      try {
        const handler = queueHandlers[this.name];
        if (handler) {
          await handler({ name, data } as any);
        }
      } catch (err) {
        logger.error({ err, queue: this.name }, `Error processing in-memory job: ${name}`);
      }
    }, 10);
    return { id: `mem_${Date.now()}`, name, data };
  }
}

const queueHandlers: Record<string, (job: Job | { name: string; data: any }) => Promise<void>> = {};

export function registerQueueHandler(queueName: string, handler: (job: any) => Promise<void>) {
  queueHandlers[queueName] = handler;
  if (isRedisAvailable && redisConnection) {
    new Worker(queueName, handler, { connection: redisConnection });
  }
}

export function createQueue(name: string) {
  if (isRedisAvailable && redisConnection) {
    return new Queue(name, { connection: redisConnection });
  }
  return new InMemoryQueue(name);
}

// Dedicated BullMQ Queues
export const emailQueue = createQueue("gqt_email_queue");
export const whatsappQueue = createQueue("gqt_whatsapp_queue");
export const certificateQueue = createQueue("gqt_certificate_queue");
export const notificationQueue = createQueue("gqt_notification_queue");
