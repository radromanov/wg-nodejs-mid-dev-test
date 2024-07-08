import express from "express";

import { Config } from "./lib";

const config = new Config();
const { port, env } = config.get();

const app = express();

app.listen(port, () =>
  console.log(`Slot Game API Gateway running on port ${port} in ${env} mode.`)
);
