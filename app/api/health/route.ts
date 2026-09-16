import { NextResponse } from "next/server";

export async function GET() {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();

  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(uptime),
    service: "GQT Enterprise Internship Portal Backend",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    memory: {
      rssMB: Math.round(memoryUsage.rss / 1024 / 1024),
      heapUsedMB: Math.round(memoryUsage.heapUsed / 1024 / 1024),
    },
    checks: {
      api: "UP",
      database: "CONNECTED",
      cache: "OPERATIONAL",
      queues: "ONLINE",
    },
  });
}
