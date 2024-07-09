import express from "express";
import { Application } from "./core";
import { Config } from "./lib";

const config = new Config();
const port = config.get("port");

export const expr = express();
export const app = new Application(expr);
export const endpoints = app.endpoints();
export const server = app.listen(port);
