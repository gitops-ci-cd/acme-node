import { Request, Response, NextFunction } from "express-serve-static-core"

export const simulateError = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error("Test error");

  next(error);
};
