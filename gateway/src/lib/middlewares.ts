import { Request, Response, NextFunction } from "express";
import { AppError } from "../core";
import { AxiosError } from "axios";

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
  } else if (
    error instanceof AxiosError &&
    error.response?.data &&
    "status" in error.response.data &&
    "stack" in error.response.data &&
    "message" in error.response.data
  ) {
    const err = error.response.data;
    res
      .status(err.status)
      .json({ status: err.status, stack: err.stack, message: err.message });
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
