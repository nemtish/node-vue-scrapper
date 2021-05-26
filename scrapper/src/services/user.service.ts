import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import config from "../config";
import { User, UserType } from "../models/user.model";

type UserStorage = {
  [key: string]: User;
};

export const userStorage: UserStorage = {};

export const saveUser = (newUser: UserType) => {
  if (userStorage[newUser.email]) {
    throw new Error("User exist");
  }
  const user = new User(newUser.email, newUser.password);
  user.id = nanoid();
  userStorage[user.email] = user;
  return user;
};

export const authorize = (authUser: UserType) => {
  const { email, password } = authUser;
  const user = findUserByEmail(email);
  let token = null;

  if (user && user.comparePassword(password)) {
    let payload = { id: "qwqe" || 0 };
    token = jwt.sign(payload, config.TOKEN_SECRET);
  } else {
    throw new Error("Wrong email / password");
  }

  return token;
};

export const findUserByEmail = (email: string) => {
  return userStorage[email];
};
