import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "@prisma/client";
import { JWT_SECRET } from "./config";

export type AuthClaims = {
  sub: string;
  role: UserRole | null;
};

export type AuthenticatedRequest = Request & {
  auth?: {
    userId: string;
    role: UserRole | null;
  };
};

export function signAuthToken(userId: string, role: UserRole | null): string {
  const claims: AuthClaims = {
    sub: userId,
    role,
  };

  return jwt.sign(claims, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing Bearer token" });
    return;
  }

  const token = authHeader.slice("Bearer ".length);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthClaims;
    req.auth = {
      userId: decoded.sub,
      role: decoded.role,
    };
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
