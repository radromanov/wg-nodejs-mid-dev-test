import { Request, Response, NextFunction } from "express";
import { AppError } from "@core/AppError";
import { Config } from "@core/Config";

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
