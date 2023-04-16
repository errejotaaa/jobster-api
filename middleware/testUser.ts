import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors";

export const testUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.testUser) {
    throw new BadRequestError("Test User. Read Only!");
  }
  next();
};
