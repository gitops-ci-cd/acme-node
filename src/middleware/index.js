import { notFoundHandler } from "./notFoundMiddleware.js";
import { errorHandler } from "./errorMiddleware.js";

export default [
  notFoundHandler,
  errorHandler,
];
