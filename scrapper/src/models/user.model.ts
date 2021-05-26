import { nanoid } from "nanoid";
import crypto from "crypto";

export type UserType = {
  email: string;
  password: string;
};

const algorithm = "aes-256-ctr";
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const iv = crypto.randomBytes(16);

export class User {
  id: string;
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.id = nanoid();
    this.email = email;
    this.password = this.encryptPassword(password);
  }

  encryptPassword(password: string) {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(password), cipher.final()]);
    return encrypted.toString("hex");
  }

  comparePassword(password: string) {
    const decipher = crypto.createDecipheriv(
      algorithm,
      secretKey,
      Buffer.from(iv.toString("hex"), "hex")
    );

    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(this.password, "hex")),
      decipher.final(),
    ]);

    return decrpyted.toString() == password;
  }
}
