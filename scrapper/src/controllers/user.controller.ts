import express, { urlencoded } from "express";
import debug from "debug";
import {
  userStorage,
  saveUser,
  findUserByEmail,
  authorize,
} from "../services/user.service";

const debugLog: debug.IDebugger = debug("user.controller");

export default () => {
  const register = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
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
  const login = (req: express.Request, res: express.Response) => {
    debugLog(req.body);

    try {
      const { email } = req.body;
      const token = authorize(req.body);

      res.status(200).json({
        success: true,
        message: "User login successfully",
        payload: { email: email, token: token },
      });
    } catch (e) {
      res.status(401).send({ error: e.message });
    }
  };
  const authenticate = (req: express.Request, res: express.Response) => {
    debugLog(req.query.email);
    const { email } = req.query;
    try {
      const user = findUserByEmail(<string>email);
      res.json({
        success: true,
        message: "Authorized user",
        payload: { user: user.id },
      });
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  return {
    register,
    login,
    authenticate,
  };
};
