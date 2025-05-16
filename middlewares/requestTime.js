const requestTime = (req, res, next) => {
  const now = new Date();

  const hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minutes =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

  console.log(
    `Richiesta ${req.method} sull'url ${req.path} alle ${hours}:${minutes}:${second}`
  );

  next();
};

module.exports = requestTime;
