import express from "express";
import { RequestHandler, Application, Express } from "express-serve-static-core";

import routeHandler from "./routes/index.ts";
import { loggingMiddleware } from "./middleware/loggingMiddleware.ts";
import { notFoundHandler } from "./middleware/notFoundHandler.ts";
import { errorHandler } from "./middleware/errorHandler.ts";

const app: Express = express();

// Middleware array, including primary routes
const stack: RequestHandler[] = [
  express.json(),
  loggingMiddleware,
  routeHandler,
  notFoundHandler,
  errorHandler,
];

// Attach each middleware in the stack to the app
stack.forEach((middleware: RequestHandler) => app.use(middleware));

export default app;
