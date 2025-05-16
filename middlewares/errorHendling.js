const errorHendling = (err, req, res, next) => {
  console.log("middleware gestione errori");
  res.json(err.message);
};

module.exports = errorHendling;
