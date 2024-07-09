import express from "express";
import { Application } from "./core";
import { Config } from "./lib";

const expr = express();
const config = new Config();
const app = new Application(expr, config);

app.endpoints();
app.listen();
