import { Request, Response, NextFunction } from "express";
import z from "zod";
import { AppError } from "@shared/errors/AppError";
import { AxiosError } from "axios";

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
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.status).json({
      status: error.status,
      stack: error.trace,
      message: error.message,
    });
  }
  if (error instanceof AxiosError) {
    if (error.response?.data) {
      // Results in a thrown AppError somewhere
      const err = error.response.data;

      if (err.status && err.stack && err.message) {
        return res.status(err.status).json({
          status: err.status,
          stack: err.stack,
          message: err.message,
        });
      } else {
        // Unknown error
        const appError = AppError.InternalServerError();

        return res.status(appError.status).json({
          status: appError.status,
          stack: appError.trace,
          message: appError.message,
        });
      }
    } else if (error.code) {
      let url = "";

      if (error.config && error.config.baseURL && error.config.url)
        url = error.config.baseURL + error.config.url;
      else url = req.path;

      // Not Found Axios error
      switch (error.code) {
        case "ENOTFOUND":
          const notFoundError = AppError.NotFound(`URL ${url} not found.`);

          return res.status(notFoundError.status).json({
            status: notFoundError.status,
            stack: notFoundError.trace,
            message: notFoundError.message,
          });
        case "ECONNREFUSED":
          const unavailableError = AppError.ServiceUnavailable(
            `Service at ${url} is likely down. Please check the service is up and running`
          );

          return res.status(unavailableError.status).json({
            status: unavailableError.status,
            stack: unavailableError.trace,
            message: unavailableError.message,
          });
      }
    }
  }

  // Unexpected error occured, construct a 500 Internal Server Error...
  const appError = AppError.InternalServerError();

  return res.status(appError.status).json({
    status: appError.status,
    stack: appError.trace,
    message: appError.message,
  });
};
