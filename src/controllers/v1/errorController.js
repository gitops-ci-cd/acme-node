export const simulateError = (req, res, next) => {
  const error = new Error("Test error");
  next(error);
};
