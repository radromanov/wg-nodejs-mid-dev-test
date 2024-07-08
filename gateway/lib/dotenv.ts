import { config } from "dotenv";
import path from "path";

const envPath = path.resolve(".env");

config({
  path: envPath,
});
