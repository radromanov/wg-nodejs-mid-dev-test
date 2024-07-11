import "module-alias/register";
import express from "express";
import { Application, Config } from "./core";

const expr = express();
const config = new Config();
const app = new Application(expr, config);

app.endpoints();
app.listen();
