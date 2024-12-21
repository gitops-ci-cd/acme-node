export const loggingMiddleware = (req, res, next) => {
  const start = Date.now();

  // Hook into the response lifecycle to log when it finishes
  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      params: req.query || req.params,
      status: res.statusCode,
      duration: `${duration}ms`,
    };
    console.info(JSON.stringify(log));
  });

  // Hook into the response lifecycle to log errors
  res.on("error", (err) => {
    const duration = Date.now() - start;
    const log = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      params: req.query || req.params,
      status: res.statusCode,
      duration: `${duration}ms`,
      error: err.message,
    };
    console.error(JSON.stringify(log));
  });

  next();
};
