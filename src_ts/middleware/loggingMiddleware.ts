// Converted to TypeScript - Add meaningful types below
export const loggingMiddleware = (req, res, next): any => {
  const start = Date.now();

  const base = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: `${req.baseUrl}${req.path}`,
    params: req.query || req.params,
  };

  // Hook into the response lifecycle to log when it finishes
  res.on("finish", (): any => {
    const duration = Date.now() - start;
    const log = {
      status: res.statusCode,
      duration: `${duration}ms`,
    };
    console.info(JSON.stringify({ ...base, ...log }));
  });

  // Hook into the response lifecycle to log errors
  res.on("error", (err): any => {
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
