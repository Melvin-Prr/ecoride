import { NextRequest } from "next/server";
import { verifyToken, extractTokenFromHeader, JWTPayload } from "@/lib/auth";

export async function authenticate(
  request: NextRequest
): Promise<JWTPayload | null> {
  const authHeader = request.headers.get("authorization");
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  return payload;
}

export async function requireAuth(
  request: NextRequest
): Promise<JWTPayload | null> {
  const user = await authenticate(request);
  if (!user) {
    return null;
  }
  return user;
}

export async function requireRole(
  request: NextRequest,
  allowedRoles: string[]
): Promise<JWTPayload | null> {
  const user = await requireAuth(request);
  if (!user) {
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    return null;
  }

  return user;
}
