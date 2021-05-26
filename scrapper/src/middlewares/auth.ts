import express from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let token = req.headers.authorization;
  if (!token)
    return res
      .status(401)
      .send({ error: "Access Denied / Unauthorized request" });

  try {
    token = token.split(" ")[1]; // Remove Bearer from string

    if (token === "null" || !token)
      return res.status(401).send({ error: "Unauthorized request" });

    let verifiedUser = jwt.verify(token, config.TOKEN_SECRET);
    if (!verifiedUser)
      return res.status(401).send({ error: "Unauthorized request" });

    next();
  } catch (error) {
    res.status(400).send({ error: "Invalid Token" });
  }
};
