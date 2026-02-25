import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/auth.types";

const SECRET = process.env.JWT_SECRET || "supersecret";

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, SECRET) as JwtPayload;
}