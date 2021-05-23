import express from "express";
import debug from "debug";

const debugLog: debug.IDebugger = debug("apiErrorHandler");

export const loginErrorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.url.includes("login")) {
    debugLog("Login error handler");
    return res.status(401).send({ error: err.message });
  } else {
    next();
  }
};
