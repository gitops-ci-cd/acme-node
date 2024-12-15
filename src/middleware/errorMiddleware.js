export const errorHandler = (err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
};
