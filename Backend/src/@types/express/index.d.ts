import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      role: string;
      roles?: {
        role: string;
        cohort_id?: string;
      }[];
    };
  }
}