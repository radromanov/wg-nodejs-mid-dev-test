import axios from "axios";
import { Config } from "@core/Config";

const config = new Config();
const gateway = config.get("gatewayUrl");

export const walletApi = axios.create({
  baseURL: gateway,
  headers: {
    "Content-Type": "application/json",
  },
});

export const rtpApi = axios.create({
  baseURL: gateway,
  headers: {
    "Content-Type": "application/json",
  },
});
