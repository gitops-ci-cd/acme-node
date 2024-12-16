import { loggingHandler } from "./loggingMiddleware.js";
import { notFoundHandler } from "./notFoundMiddleware.js";
import { errorHandler } from "./errorMiddleware.js";

export default [
  loggingHandler,
  notFoundHandler,
  errorHandler,
];
