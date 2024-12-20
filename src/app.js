import express from "express";

import routes from "./routes/index.js";
import middleware from "./middleware/index.js";
import terminalMiddleware from "./middleware/terminalMiddleware.js";


const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Loop through all general middleware
middleware.forEach((mw) => app.use(mw));

// Primary application routes
app.use("/api", routes);

// Terminal middleware to be called at the end of the stack
terminalMiddleware.forEach((mw) => app.use(mw));

export default app;
