import { config } from "dotenv";
import path from "path";

const envPath = path.resolve(
  process.env.NODE_ENV === "production" ? ".env.production" : ".env"
);

console.log(envPath);

config({
  path: envPath,
});
