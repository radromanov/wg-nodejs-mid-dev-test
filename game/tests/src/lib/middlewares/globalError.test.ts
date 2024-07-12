import { Request, Response, NextFunction } from "express";
import { globalError } from "@lib/middlewares";
import { AppError } from "@core/AppError";

describe("globalError Middleware", () => {
  const req = {} as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const nextFunction: NextFunction = jest.fn();

  it("should handle AppError and respond with proper status and message", () => {
    const error = AppError.BadRequest("Invalid input");

    globalError(error, req, res, nextFunction);

    expect(res.status).toHaveBeenCalledWith(error.status);
    expect(res.json).toHaveBeenCalledWith({
      status: error.status,
      stack: error.trace,
      message: error.message,
    });
  });

  it("should handle unknown errors and respond with 500 status", () => {
    const error = new Error("Unknown Error");

    globalError(error, req, res, nextFunction);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      stack: expect.any(String),
      message: "Internal Server Error",
    });
  });
});
