import _random from "lodash/random";
import { AppError } from "@core/AppError";
import { Config } from "@core/Config";
import { Request, Response, NextFunction } from "express";

export function rand(lower: number = 0, upper?: number) {
  if (upper) {
    return _random(lower, upper - 1); // lodash's random is inclusive of the upper bound
  }

  return _random(lower);
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
    const config = new Config();
    const gatewayUrl = config.get("gatewayUrl");

    res.header("Access-Control-Allow-Methods", methods.join(","));
    res.header("Access-Control-Allow-Origin", gatewayUrl);
    res.header("Accept", "application/json");

    res.sendStatus(204);
  };
