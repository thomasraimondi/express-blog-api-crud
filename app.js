//* Imports
const routerPost = require("./routers/posts");
const requestTime = require("./middlewares/Global/requestTime");
const errorHendling = require("./middlewares/ErrorHandling/errorHendling");
const notFound = require("./middlewares/ErrorHandling/notFoundError");

// * App Config
const express = require("express");
const app = express();
const { appPort, appUrl } = require("./data/db");

// * static Asset
app.use(express.static("public"));
app.use(express.json());

app.use(requestTime);

app.use("/posts", routerPost);

app.use(notFound);
app.use(errorHendling);

app.listen(appPort, () => {
  console.log(`Server in ascolto: ${appUrl}`);
});
