export const loggingHandler = (req, res, next) => {
  const start = Date.now(); // Start timing the request

  // Hook into the response lifecycle to log when it finishes
  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
    };
    console.log(JSON.stringify(log));
  });

  // Hook into the response lifecycle to log errors
  res.on("error", (err) => {
    const duration = Date.now() - start;
    const errorLog = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      error: err.message,
    };
    console.error(JSON.stringify(errorLog));
  });

  next();
};
