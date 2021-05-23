import express from "express";
import debug from "debug";
import jwt from "jsonwebtoken";
import config from "../config";
import {
  userStorage,
  saveUser,
  findUserByEmail,
} from "../services/user.service";

const debugLog: debug.IDebugger = debug("user.controller");

export default () => {
  const register = (req: express.Request, res: express.Response) => {
    try {
      const user = saveUser(req.body);
      debugLog(userStorage);
      res.json({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    } catch (e) {
      res.status(401).send({ error: e.message });
    }
  };
  const login = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    debugLog(req.body);
    const { email, password } = req.body;

    const user = findUserByEmail(email);
    if (user && user.comparePassword(password)) {
      let payload = { id: "qwqe" || 0 };
      const token = jwt.sign(payload, config.TOKEN_SECRET);

      res.status(200).json({
        success: true,
        message: "User login successfully",
        payload: { email: email, token: token },
      });
    } else {
      res.status(401).send({ error: "Wrong email / password" });
    }
  };
  const authenticate = (req: express.Request, res: express.Response) => {
    debugLog(req.query.email);
    res.json({
      success: true,
      message: "Authorized user",
      payload: { user: "ID" },
    });
  };

  return {
    register,
    login,
    authenticate,
  };
};
