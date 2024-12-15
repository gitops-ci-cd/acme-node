import express from "express";
import routes from "./routes/index.js";
import middleware from "./middleware/index.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Primary application routes
app.use(routes);

// Loop through all middleware and add them to the app
middleware.forEach((mw) => app.use(mw));

export default app;
