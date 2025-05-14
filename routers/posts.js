const express = require("express");
const router = express.Router();
let { posts } = require("../data/db");
const { isJSONType } = require("ajv/dist/compile/rules");

// # INDEX
router.get("/", (req, res) => {
  console.log("richiesta ricevuta route: Home");
  const id = parseInt(req.query.id);
  console.log(id);
  if (!isNaN(id)) {
    const post = posts.find((post) => post.id === id);
    if (post) {
      res.header({ "Access-Control-Allow-Origin": "*" });
      res.status(200).json({ status: 200, success: "ok", data: post });
    } else {
      res.header({ "Access-Control-Allow-Origin": "*" });
      res
        .status(404)
        .json({ status: 404, success: "ok", data: "post not found" });
    }
  } else {
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(200).json({ status: 200, success: "ok", data: posts });
  }
});

// # SHOW
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log("richiesta per il post: " + id);

  const post = posts.find((post) => post.id === id);

  res.header({ "Access-Control-Allow-Origin": "*" });
  post
    ? res.status(200).json({ status: 200, success: "ok", data: post })
    : res
        .status(404)
        .json({ status: 404, success: "ko", data: "post not found" });
});

// # STORE
router.post("/", (req, res) => {
  const { title, content, image, tags } = req.body; // destructure body of request

  if (title.length > 0 && content.length > 0) {
    const id = posts[posts.length - 1].id + 1; // generate id
    const post = { id, title, content, image, tags }; // create new post
    posts.push(post); // add new post in array

    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(201).json({ status: 201, success: "ok", data: post });
  } else {
    res.header({ "Access-Control-Allow-Origin": "*" });
    res.status(400).json({
      status: 400,
      success: "ko",
      data: "title and content are empty",
    });
  }
});

// # UPDATE
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log("richiesta la modifica del post: " + id);

  const post = posts.find((post) => post.id === id);

  res.header({ "Access-Control-Allow-Origin": "*" });
  post
    ? res.status(202).json({ status: 202, success: "ok", data: post })
    : res
        .status(404)
        .json({ status: 404, success: "ko", data: "post not found" });
});

// # MODIFY
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log("richiesta la modifica del post: " + id);

  const post = posts.find((post) => post.id === id);

  res.header({ "Access-Control-Allow-Origin": "*" });
  post
    ? res.status(202).json({ status: 202, success: "ok", data: post })
    : res
        .status(404)
        .json({ status: 404, success: "ko", data: "post not found" });
});

// # DELETE
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log("richiesta l'eliminazione del post: " + id);
  const post = posts.find((post) => post.id === id);

  res.header({ "Access-Control-Allow-Origin": "*" });
  if (post) {
    posts = posts.filter((post) => post.id !== id);
    res.status(200).json({ status: 200, success: "ok", data: posts });
  } else {
    res
      .status(404)
      .json({ status: 404, success: "ko", data: "post not found" });
  }
});

module.exports = router;
