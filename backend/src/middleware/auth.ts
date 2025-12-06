import type { Request, Response, NextFunction } from "express";

export function verifyApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.header("x-api-key");
  const expectedKey = process.env.API_SECRET || "dev-secret";

  if (!apiKey || apiKey !== expectedKey) {
    return res
      .status(401)
      .json({ error: "Unauthorized: invalid or missing API key" });
  }

  next();
}
