import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

export function isDecimal(n: number) {
  return n - Math.floor(n) !== 0;
}

export function allEqual<T>(arr: T[]) {
  return arr.every((val) => val === arr[0]);
}

export function allOfType<T>(
  arr: T[],
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "bigint"
    | "function"
    | "symbol"
    | "undefined"
) {
  if (!arr.length) {
    throw AppError.BadRequest(
      `AllOfType Error: Symbols must be a non-empty array`
    );
  }

  if (!Array.isArray(arr)) {
    throw AppError.BadRequest(
      `AllOfType Error: Symbols must be an array. Provided ${typeof arr}`
    );
  }

  return arr.every((val) => typeof val === type);
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

export const handleOptions =
  (methods: string[]) =>
  (_req: Request, res: Response, _next: NextFunction) => {
    res.header("Access-Control-Allow-Methods", methods.join(","));
    res.header(
      "Access-Control-Allow-Origin",
      process.env.GATEWAY_URL || "http://localhost:3000"
    );
    res.header("Accept", "application/json");

    res.sendStatus(204);
  };
