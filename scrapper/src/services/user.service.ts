import { nanoid } from "nanoid";
import { User, UserType } from "../models/user.model";

interface UserStorage {
  [key: string]: User;
}

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

export const findUserByEmail = (email: string) => {
  return userStorage[email];
};
