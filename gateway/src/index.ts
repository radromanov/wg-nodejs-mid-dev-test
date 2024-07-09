import express from "express";
import { Application } from "./core";
import { Config } from "./lib";

const expr = express();
const config = new Config();
const port = config.get("port");
const app = new Application(expr);

app.endpoints();
app.listen(port);
