const checkDataCrudStore = (req, res, next) => {
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
    const error = new Error("element malformat");
    error.statusCode = 400;
    error.data = { malformatElements };
    throw error;
  } else {
    next();
  }
};

module.exports = checkDataCrudStore;
