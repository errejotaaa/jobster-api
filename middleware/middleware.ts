import express from "express";
import path from "path";
import helmet from "helmet";
import xss from "xss-clean";

export const middleware = [
  express.static(path.resolve(__dirname, "../client/build")),
  express.json(),
  helmet(),
  xss(),
];
