import "@lib/dotenv";
import { z } from "zod";
import { HOST_MIN_LENGTH } from "@lib/constants";
import { minimum, required } from "@lib/zod";

import { AppError } from "./AppError";

export class Config {
  private schema = z.object({
    port: z
      .string(required("process.env.GATEWAY_PORT"))
      .min(2, minimum("process.env.GATEWAY_PORT", 2))
      .transform((val) => parseInt(val, 10)),
    env: z.enum(
      ["development", "production", "testing", "staging"],
      required("process.env.NODE_ENV")
    ),
    gameServiceUrl: z
      .string(required("process.env.GAME_SERVICE_URL"))
      .min(
        HOST_MIN_LENGTH,
        minimum("process.env.GAME_SERVICE_URL", HOST_MIN_LENGTH)
      ),
    walletServiceUrl: z
      .string(required("process.env.WALLET_SERVICE_URL"))
      .min(
        HOST_MIN_LENGTH,
        minimum("process.env.WALLET_SERVICE_URL", HOST_MIN_LENGTH)
      ),
    rtpServiceUrl: z
      .string(required("process.env.RTP_SERVICE_URL"))
      .min(
        HOST_MIN_LENGTH,
        minimum("process.env.RTP_SERVICE_URL", HOST_MIN_LENGTH)
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
        port: process.env.GATEWAY_PORT,
        env: process.env.NODE_ENV,
        gameServiceUrl: process.env.GAME_SERVICE_URL,
        walletServiceUrl: process.env.WALLET_SERVICE_URL,
        rtpServiceUrl: process.env.RTP_SERVICE_URL,
      });

      if (key) return fromEnv[key];
      else return fromEnv;
    } catch (error) {
      throw AppError.InternalServerError(
        "Internal Server Error - could not initialize Game Service."
      );
    }
  }
}
