import axios from "axios";
import { Config } from "@core/Config";

const config = new Config();
const gameServiceUrl = config.get("gameServiceUrl");

export const gameApi = axios.create({
  baseURL: gameServiceUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
