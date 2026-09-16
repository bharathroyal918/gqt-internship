import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3000),
  NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000"),
  NEXT_PUBLIC_API_URL: z.string().default("http://localhost:3000/api/v1"),
  DATABASE_URL: z.string().default("postgresql://postgres:postgres@localhost:5432/gqt_internships?schema=public"),
  DIRECT_URL: z.string().optional(),
  JWT_SECRET: z.string().default("gqt_super_secret_enterprise_jwt_signing_key_2026_prod"),
  JWT_REFRESH_SECRET: z.string().default("gqt_super_secret_refresh_token_signing_key_2026_prod"),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  REDIS_CACHE_TTL_SECONDS: z.coerce.number().default(3600),
  CLOUDINARY_CLOUD_NAME: z.string().default("gqt-enterprise-cdn"),
  CLOUDINARY_API_KEY: z.string().default("789456123456789"),
  CLOUDINARY_API_SECRET: z.string().default("gqt_cloudinary_secure_api_secret_key"),
  SMTP_HOST: z.string().default("smtp.sendgrid.net"),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().default("apikey"),
  SMTP_PASSWORD: z.string().default("mock_smtp_password"),
  SMTP_FROM: z.string().default("Global Quest Technologies <admissions@gqtech.in>"),
  WHATSAPP_API_URL: z.string().default("https://graph.facebook.com/v19.0"),
  WHATSAPP_PHONE_NUMBER_ID: z.string().default("109823475019283"),
  WHATSAPP_ACCESS_TOKEN: z.string().default("EAAG_mock_whatsapp_token"),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),
});

export const env = envSchema.parse(process.env);
