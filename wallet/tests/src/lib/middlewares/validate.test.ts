import { Request, Response, NextFunction } from "express";
import z from "zod";
import { validate } from "@lib/middlewares";
import { AppError } from "@core/AppError";

describe("validate Middleware", () => {
  const schema = z.object({
    body: z.object({
      bet: z.number().positive(),
    }),
  });

  const nextFunction: NextFunction = jest.fn();

  it("should call next() if validation succeeds", () => {
    const req = {
      body: { bet: 100 },
      params: {},
      query: {},
    } as Request;

    const res = {} as Response;

    validate(schema)(req, res, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith();
  });

  it("should call next(error) if validation fails", () => {
    const req = {
      body: { bet: "100" },
      params: {},
      query: {},
    } as Request;

    const res = {} as Response;

    validate(schema)(req, res, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith(expect.any(AppError));
  });
});
