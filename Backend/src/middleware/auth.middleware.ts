import { Request, Response, NextFunction } from "express";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Auth middleware running");

  // Example: attach dummy user for now
  (req as any).user = { role: "TYN_EXECUTIVE" };

  next();
};

export default authMiddleware;
