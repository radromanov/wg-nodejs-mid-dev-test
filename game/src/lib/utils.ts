import { AppError } from "@core/AppError";
import { Request, Response, NextFunction } from "express";

export function rand(upper?: number) {
  if (upper) {
    return Math.floor(Math.random() * upper);
  }

  return Math.floor(Math.random());
}

export function allEqual<T>(arr: T[]) {
  return arr.every((val) => val === arr[0]);
}

export function handleNotImplemented(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  next(
    AppError.MethodNotAllowed(
      `${req.method} method on ${req.path} is not implemented.`
    )
  );
}
