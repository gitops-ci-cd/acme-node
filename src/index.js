// Import Express
import express, { json } from "express";

// Create an instance of an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(json());

// Define a simple route
app.get("/hello", (req, res) => {
  const audience = req.query.audience || "World";

  res.send(`Hello, ${audience}!`);
});

app.get("/salutations", (req, res) => {
  const audience = req.query.audience || "World";

  res.send(`Hello, ${audience}!`);
});

// Define a route to simulate an error
app.get("/boom", (_req, _res, next) => {
  const error = new Error("Test error");

  next(error);
});

// Middleware to handle 404 - Not Found errors
app.use((_req, res) => {
  res.status(404).send("Route not found");
});

// Middleware to handle errors
app.use((_err, _req, res, _next) => {
  res.status(500).send("Something went wrong!");
});

export default app; // Export the app for testing
