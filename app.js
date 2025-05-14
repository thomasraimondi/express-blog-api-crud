// * App Config
const express = require("express");
const app = express();
const { appPort, appUrl } = require("./data/db");

//* Import Raouter
const routerPost = require("./routers/posts");

// * static Asset
app.use(express.static("public"));
app.use(express.json());

app.use("/posts", routerPost);

app.listen(appPort, () => {
  console.log(`Server in ascolto: ${appUrl}`);
});
