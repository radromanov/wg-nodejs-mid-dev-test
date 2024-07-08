import express from "express";
import { Application } from "./core";

const expr = express();
const app = new Application(expr);

app.endpoints();
app.listen();
