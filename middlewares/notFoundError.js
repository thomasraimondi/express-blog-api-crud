const notFound = (req, res, next) => {
  res.status(404);
  res.json("page not found");
};

module.exports = notFound;
