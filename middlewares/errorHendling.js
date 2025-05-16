const errorHendling = (err, req, res, next) => {
  console.log("middleware gestione errori");
  res.json("ciao");
};

module.exports = errorHendling;
