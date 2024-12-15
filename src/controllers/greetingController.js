export const greet = (req, res) => {
  const audience = req.query.audience || "World";
  res.send(`Hello, ${audience}!`);
};
