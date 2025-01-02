import { context, propagation } from "@opentelemetry/api";

export const loggingMiddleware = (req, res, next) => {
  const start = Date.now();

  const base = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: `${req.baseUrl}${req.path}`,
    params: req.query || req.params,
  };

  const extractedContext = propagation.extract(context.active(), req.headers);

  // Log traceparent and baggage extraction
  const baggage = propagation.getBaggage(extractedContext);
  console.log("Extracted Baggage:", baggage ? baggage.getAllEntries() : "None");

  // Hook into the response lifecycle to log when it finishes
  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = {
      status: res.statusCode,
      duration: `${duration}ms`,
    };
    console.info(JSON.stringify({ ...base, ...log }));
  });

  // Hook into the response lifecycle to log errors
  res.on("error", (err) => {
    const duration = Date.now() - start;
    const log = {
      status: res.statusCode || 500,
      duration: `${duration}ms`,
      error: err.message,
    };
    console.error(JSON.stringify({ ...base, ...log }));
  });

  next();
};
