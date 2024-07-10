import express from "express";
import { Application } from "@core/Application";
import { Config } from "@core/Config";

const config = new Config();
const expr = express();

export const app = new Application(expr, config);
