import dotenv from "dotenv";

dotenv.config();

export const API_PORT = Number(process.env.API_PORT ?? 8787);
export const DATABASE_URL = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
export const JWT_SECRET = process.env.JWT_SECRET ?? "dev-only-jwt-secret-change-me";
export const OTP_EXPIRY_SECONDS = Number(process.env.OTP_EXPIRY_SECONDS ?? 300);
export const NODE_ENV = process.env.NODE_ENV ?? "development";

export const CORS_ORIGINS = (process.env.CORS_ORIGIN ?? "http://localhost:5173")
	.split(",")
	.map((origin) => origin.trim())
	.filter(Boolean);

export const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000);
export const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX ?? 300);

if (NODE_ENV === "production" && JWT_SECRET === "dev-only-jwt-secret-change-me") {
	throw new Error("Set a strong JWT_SECRET in production environment");
}
