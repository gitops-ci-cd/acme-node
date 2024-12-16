import express from "express";

import routes from "./routes/index.js";
import middleware from "./middleware/index.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Primary application routes
app.use("/api", routes);

// Loop through all middleware
middleware.forEach((mw) => app.use(mw));

export default app;
