const notFound = (req, res, next) => {
  console.log("page not found");
  res.json("ciao2");
};

module.exports = notFound;
