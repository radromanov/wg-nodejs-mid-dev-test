import axios from "axios";
import { Config } from "@core/Config";
import { ROUTES } from "./constants";

const config = new Config();
const { gameServiceUrl, walletServiceUrl, rtpServiceUrl } = config.get();

export const gameApi = axios.create({
  baseURL: gameServiceUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const walletApi = axios.create({
  baseURL: `${walletServiceUrl}${ROUTES.WALLET.ROOT}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const rtpApi = axios.create({
  baseURL: `${rtpServiceUrl}${ROUTES.RTP}`,
  headers: {
    "Content-Type": "application/json",
  },
});
