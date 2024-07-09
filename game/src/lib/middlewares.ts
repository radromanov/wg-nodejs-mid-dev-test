import { Request, Response, NextFunction } from "express";
import z from "zod";

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
        throw new Error(valid.error.errors[0].message);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
