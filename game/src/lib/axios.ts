import axios from "axios";
import { Config } from "@core/Config";

const config = new Config();
const walletServiceUrl = config.get("walletServiceUrl");

export const walletApi = axios.create({
  baseURL: walletServiceUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
