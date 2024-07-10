import { Request, Response, NextFunction } from "express";
import z from "zod";
import { AppError } from "@core/AppError";

/**
 * Validates the incoming user request and throws and error if invalid.
 * @param schema Zod Schema to parse an incoming request against. Schema must have `body`, `params`, or `query` property attached to it.
 * @returns `next() || next(error)`
 * @example expressApp.post("/register", validate(Schema), (req, res) => { ... })
 */
export const validate =
  (schema: z.ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const valid = schema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      if (!valid.success) {
        throw AppError.BadRequest(valid.error.errors[0].message);
      }

      next();
    } catch (error) {
      next(error);
    }
  };

/**
 * Try/catch wrapper middleware. Sends any thrown errors to the global error handler.
 * @param callback Async callback function, accepting an `Express` `Request` and `Response` params.
 */
export const catcher =
  (callback: (req: Request, res: Response) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res);
    } catch (error) {
      next(error);
    }
  };

export const globalError = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof AppError) {
    res.status(error.status).json({
      status: error.status,
      stack: error.trace,
      message: error.message,
    });
  } else {
    // Unexpected error occured, construct a 500 Internal Server Error...
    const appError = AppError.InternalServerError();

    res.status(appError.status).json({
      status: appError.status,
      stack: appError.trace,
      message: appError.message,
    });
  }
};
