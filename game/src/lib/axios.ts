import axios from "axios";
import { Config } from "@core/Config";

const config = new Config();
const { walletServiceUrl, rtpServiceUrl } = config.get();

export const walletApi = axios.create({
  baseURL: walletServiceUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const rtpApi = axios.create({
  baseURL: rtpServiceUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
