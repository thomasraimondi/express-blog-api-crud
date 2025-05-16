const requestTime = (req, res, next) => {
  console.log("requestTime");
  next();
};

module.exports = requestTime;
