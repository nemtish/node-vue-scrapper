import express from "express";
import cors from "cors";
import debug from "debug";
import methodOverride from "method-override";
import apiRouter from "./routes/api.routes.config";
import { loginErrorHandler } from "./middlewares/apiErrorHandler";

const app: express.Application = express();
const port = 3000;
const debugLog: debug.IDebugger = debug("app");

app.use(express.json());
app.use(cors());

// this is a simple route to make sure everything is working properly
app.get("/", (_, res: express.Response) => {
  res.status(200).send(`Server up and running on port ${port}!`);
});

app.use("/api", apiRouter());

app.use(methodOverride());
app.use(loginErrorHandler);

app.listen(port, () => {
  debugLog(`Server running ar http://localhost:${port}`);
});

process.on("uncaughtException", () => process.exit(1));
process.on("SIGTERM", () => process.exit());

export default app;
