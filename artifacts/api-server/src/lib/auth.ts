import type { NextFunction, Request, Response } from "express";

function parseBasicAuth(header: string | undefined) {
  if (!header || !header.startsWith("Basic ")) return null;
  const encoded = header.slice(6);
  try {
    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    const separator = decoded.indexOf(":");
    if (separator === -1) return null;
    return {
      username: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const provided = parseBasicAuth(req.headers.authorization);
  const expectedUsername = process.env.ADMIN_USERNAME ?? "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "admin123";

  if (
    !provided ||
    provided.username !== expectedUsername ||
    provided.password !== expectedPassword
  ) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Admin Dashboard"');
    res.status(401).json({ message: "Invalid admin credentials." });
    return;
  }

  next();
}
