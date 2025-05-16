const notFound = (req, res, next) => {
  const error = new Error("page not found");
  error.status = 404;
  throw error;
};

module.exports = notFound;
