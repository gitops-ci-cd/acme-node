export const notFoundHandler = (req, res) => {
  res.status(404).send("Route not found");
};
