export const loggingMiddleware = (req, res, next) => {
  const start = Date.now();

  // req.headers["baggage"] = "feature=login";
  // req.headers["traceparent"] = "00-6f8f63e2a67a703e8671429f1f28527e-486ddbb4d69e0303-01";

  const base = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: `${req.baseUrl}${req.path}`,
    params: req.query || req.params,
  };

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
