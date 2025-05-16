const errorHendling = (err, req, res, next) => {
  console.log("middleware gestione errori");
  const statusCode = err.statusCode ?? 500;

  res.status(statusCode);
  res.json({ message: err.message, responseData: err.data });
};

module.exports = errorHendling;
