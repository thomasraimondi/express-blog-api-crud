let { posts } = require("../data/db");

const index = (req, res) => {
  console.log(abc);

  console.log("richiesta ricevuta route: Home");
  title = req.query.title;
  tags = req.query.tags;
  let filteredPosts = posts;
  console.log(title, tags);
  if (tags) {
    filteredPosts = filteredPosts.filter((post) => post.tags.includes(tags));
  }
  if (title) {
    filteredPosts = filteredPosts.filter((post) => post.title.includes(title));
  }

  if (filteredPosts.length <= 0) {
    res
      .status(200)
      .json({ status: 200, success: "ok", message: "No Item Found" });

    return;
  }

  res.status(200).json({ status: 200, success: "ok", data: filteredPosts });
};

const show = (req, res) => {
  const id = parseInt(req.params.id);
  console.log("richiesta per il post: " + id);

  const originalPost = posts.find((post) => post.id === id);
  res.header({ "Access-Control-Allow-Origin": "*" });
  if (!originalPost) {
    const error = new Error("Item not found");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({ status: 200, success: "ok", data: originalPost });
};

const store = (req, res) => {
  const { title, content, image, tags } = req.body; // destructure body of request

  let maxId = 0;
  for (const post of posts) {
    if (post.id > maxId) maxId = post.id;
  }

  const postId = maxId + 1; // generate post id

  const post = { id: postId, title, content, image, tags }; // create new post

  posts.push(post); // add new post in array

  res.status(201).json({ status: 201, success: "ok", data: post });
};

const update = (req, res) => {
  const id = parseInt(req.params.id);

  console.log("richiesta la modifica del post: " + id);

  const originalPost = posts.find((post) => post.id === id);

  if (!originalPost) {
    const error = new Error("Item not found");
    error.statusCode = 404;
    throw error;
  }

  const title = req.body.title ?? originalPost.title;
  const content = req.body.content ?? originalPost.content;
  const image = req.body.image ?? originalPost.image;
  const tags = req.body.tags ?? originalPost.tags;

  const malformatElements = [];

  if (typeof title !== "string" || title.length < 3) {
    malformatElements.push("title");
  }
  if (typeof content !== "string" || content.length < 3) {
    malformatElements.push("content");
  }
  if (typeof image !== "string") {
    malformatElements.push("image");
  }
  if (!Array.isArray(tags)) {
    malformatElements.push("tags");
  }

  if (malformatElements.length) {
    const error = new Error("element malformat");
    error.statusCode = 400;
    error.data = { malformatElements };
    throw error;
  }

  const updatedPost = { id: originalPost.id, title, content, image, tags };
  posts.splice(posts.indexOf(originalPost), 1, updatedPost);

  res.status(200).json({ status: 200, success: "ok", data: updatedPost });
};

const modify = (req, res) => {
  const id = parseInt(req.params.id);

  console.log("richiesta la modifica del post: " + id);

  const originalPost = posts.find((post) => post.id === id);

  if (!originalPost) {
    const error = new Error("Item not found");
    error.statusCode = 404;
    throw error;
  }

  const title = req.body.title ?? originalPost.title;
  const content = req.body.content ?? originalPost.content;
  const image = req.body.image ?? originalPost.image;
  const tags = req.body.tags ?? originalPost.tags;

  const malformatElements = [];

  if (typeof title !== "string" || title.length < 3) {
    malformatElements.push("title");
  }
  if (typeof content !== "string" || content.length < 3) {
    malformatElements.push("content");
  }
  if (typeof image !== "string") {
    malformatElements.push("image");
  }
  if (!Array.isArray(tags)) {
    malformatElements.push("tags");
  }

  if (malformatElements.length) {
    const error = new Error("element malformat");
    error.statusCode = 400;
    error.data = { malformatElements };
    throw error;
  }

  originalPost.title = title;
  originalPost.content = content;
  originalPost.image = image;
  originalPost.tags = tags;

  res.status(200).json({ status: 200, success: "ok", data: originalPost });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id);
  console.log("richiesta l'eliminazione del post: " + id);
  const post = posts.find((post) => post.id === id);

  if (!originalPost) {
    const error = new Error("Item not found");
    error.statusCode = 404;
    throw error;
  }

  //   posts = posts.filter((post) => post.id !== id);
  posts.splice(posts.indexOf(post), 1);
  res.status(204);
};

module.exports = { index, show, store, update, modify, destroy };
