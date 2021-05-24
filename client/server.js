import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.join(__dirname, "dist")));
app.listen(port);
