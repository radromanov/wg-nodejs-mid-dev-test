import "./dotenv";

import { z } from "zod";
import { minimum, required } from "./zod";
import { HOST_MIN_LENGTH, PORT_MIN_LENGTH } from "./constants";

export class Config {
  private schema = z.object({
    host: z
      .string(required("process.env.GATEWAY_HOST"))
      .min(
        HOST_MIN_LENGTH,
        minimum("process.env.GATEWAY_HOST", HOST_MIN_LENGTH)
      ),
    port: z
      .string(required("process.env.GATEWAY_PORT"))
      .min(
        PORT_MIN_LENGTH,
        minimum("process.env.GATEWAY_PORT", PORT_MIN_LENGTH)
      )
      .transform((val) => parseInt(val, 10)),
    env: z.enum(
      ["development", "production", "testing", "staging"],
      required("process.env.NODE_ENV")
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
        host: process.env.GATEWAY_HOST,
        port: process.env.GATEWAY_PORT,
        env: process.env.NODE_ENV,
      });

      if (key) return fromEnv[key];
      else return fromEnv;
    } catch (error) {
      throw new Error("Internal Server Error - could not initialize gateway.");
    }
  }
}
