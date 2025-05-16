const fs = require("node:fs");

const requestTime = (req, res, next) => {
  const now = new Date();

  const hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minutes =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

  const currentTime = `${hours}:${minutes}:${second}`;

  const content = `\n Richiesta ${req.method} sull'url ${req.path} alle ${hours}:${minutes}:${second}`;

  fs.appendFile("./log/requestLog.txt", content, (err) => {
    if (err) {
      throw err;
    }
  });

  console.log(
    `Richiesta ${req.method} sull'url ${req.path} alle ${hours}:${minutes}:${second}`
  );

  next();
};

module.exports = requestTime;
