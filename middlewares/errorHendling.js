const errorHendling = (err, req, res, next) => {
  console.log("middleware gestione errori");
  res.status(500);
  res.json(err.message);
};

module.exports = errorHendling;
