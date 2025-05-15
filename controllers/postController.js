let { posts } = require("../data/db");

const index = (req, res) => {
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

  const post = posts.find((post) => post.id === id);
  res.header({ "Access-Control-Allow-Origin": "*" });
  if (!post) {
    res
      .status(404)
      .json({ status: 404, success: "ko", message: "post not found" });
    return;
  }
  res.status(200).json({ status: 200, success: "ok", data: post });
};

const store = (req, res) => {
  const { title, content, image, tags } = req.body; // destructure body of request

  const malformatElements = [];

  if (!title || typeof title !== "string" || title.length < 3) {
    malformatElements.push("title");
  }
  if (!content || typeof content !== "string" || content.length < 3) {
    malformatElements.push("content");
  }
  if (typeof image !== "string" || image.length < 3) {
    malformatElements.push("image");
  }
  if (!Array.isArray(tags)) {
    malformatElements.push("tags");
  }

  if (malformatElements.length) {
    res.status(400).json({
      status: 400,
      success: "ko",
      message: "element malformat",
      malformatElements,
    });

    return;
  }

  // const id = posts[posts.length - 1].id + 1; // generate id

  let maxId = 0;
  for (const post of posts) {
    if (post.id > maxId) maxId = post.id;
  }

  const postId = maxId + 1;

  const post = { id: postId, title, content, image, tags }; // create new post
  posts.push(post); // add new post in array

  res.status(201).json({ status: 201, success: "ok", data: post });
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  console.log("richiesta la modifica del post: " + id);

  const post = posts.find((post) => post.id === id);

  res.header({ "Access-Control-Allow-Origin": "*" });

  if (!post) {
    res
      .status(404)
      .json({ status: 404, success: "ko", data: "post not found" });

    return;
  }

  res.status(202).json({ status: 202, success: "ok", data: post });
};

const modify = (req, res) => {
  const id = parseInt(req.params.id);
  console.log("richiesta la modifica del post: " + id);

  const post = posts.find((post) => post.id === id);

  res.header({ "Access-Control-Allow-Origin": "*" });

  if (!post) {
    res
      .status(404)
      .json({ status: 404, success: "ko", data: "post not found" });

    return;
  }

  res.status(202).json({ status: 202, success: "ok", data: post });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id);
  console.log("richiesta l'eliminazione del post: " + id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    res
      .status(404)
      .json({ status: 404, success: "ko", message: "post not found" });
    return;
  }

  //   posts = posts.filter((post) => post.id !== id);
  posts.splice(posts.indexOf(post), 1);
  res.status(204);
};

module.exports = { index, show, store, update, modify, destroy };
