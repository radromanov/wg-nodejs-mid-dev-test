import "module-alias/register";

import express from "express";
import { Application } from "./core";
import { Config } from "@core/Config";

const config = new Config();

export const expr = express();
export const app = new Application(expr, config);
export const endpoints = app.endpoints();
export const server = app.listen();
