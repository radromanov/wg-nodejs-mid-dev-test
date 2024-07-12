import { Request, Response, NextFunction } from "express";
import { catcher } from "@lib/middlewares";

describe("catcher Middleware", () => {
  const req = {} as Request;
  const res = {} as Response;
  const nextFunction: NextFunction = jest.fn();

  it("should call next() if no error is thrown", async () => {
    const callback = jest.fn().mockResolvedValueOnce(undefined);

    await catcher(callback)(req, res, nextFunction);

    expect(callback).toHaveBeenCalledWith(req, res);
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it("should call next(error) if an error is thrown", async () => {
    const error = new Error("Test Error");
    const callback = jest.fn().mockRejectedValueOnce(error);

    await catcher(callback)(req, res, nextFunction);

    expect(callback).toHaveBeenCalledWith(req, res);
    expect(nextFunction).toHaveBeenCalledWith(error);
  });
});
