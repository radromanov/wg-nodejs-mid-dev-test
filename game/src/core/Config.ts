import "@lib/dotenv";
import { z, ZodError } from "zod";
import { HOST_MIN_LENGTH } from "@lib/constants";
import { minimum, required } from "@lib/zod";

import { AppError } from "./AppError";

export class Config {
  private schema = z.object({
    port: z
      .string(required("process.env.GAME_SERVICE_PORT"))
      .min(2, minimum("process.env.GAME_SERVICE_PORT", 2))
      .transform((val) => parseInt(val, 10)),
    env: z.enum(
      ["development", "production", "testing", "staging"],
      required("process.env.NODE_ENV")
    ),
    gatewayUrl: z
      .string(required("process.env.GATEWAY_URL"))
      .min(
        HOST_MIN_LENGTH,
        minimum("process.env.GATEWAY_URL", HOST_MIN_LENGTH)
      ),
  });

  get(key?: never): ReturnType<typeof this.schema.parse>;
  get<T extends keyof ReturnType<typeof this.schema.parse>>(
    key: T
  ): ReturnType<typeof this.schema.parse>[T];
  get<T extends keyof ReturnType<typeof this.schema.parse>>(key?: T) {
    try {
      // Load .env variables
      const fromEnv = this.schema.parse({
        port: process.env.GAME_SERVICE_PORT,
        env: process.env.NODE_ENV,
        gatewayUrl: process.env.GATEWAY_URL,
      });

      if (key) return fromEnv[key];
      else return fromEnv;
    } catch (error) {
      if (error instanceof ZodError) {
        throw AppError.InternalServerError(error.errors[0].message);
      } else {
        throw AppError.InternalServerError(
          "Error initializing Game Service. Please check your '.env' file for missing environment variables."
        );
      }
    }
  }
}
