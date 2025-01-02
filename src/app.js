import express from "express";

import routeHandler from "./routes/index.js";
import { loggingMiddleware } from "./middleware/loggingMiddleware.js";
import { baggageExtractorMiddleware } from "./middleware/baggageExtractorMiddleware.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware array, including primary routes
const stack = [
  express.json(),
  loggingMiddleware,
  baggageExtractorMiddleware,
  routeHandler,
  notFoundHandler,
  errorHandler,
];

// Attach each middleware in the stack to the app
stack.forEach((middleware) => app.use(middleware));

export default app;
