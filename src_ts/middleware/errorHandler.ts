// Converted to TypeScript - Add meaningful types below
export const errorHandler = (err, req, res): any => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
};
