const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const middlewareStore = require("../middlewares/Route/checkDataStore");

router.get("/", postController.index);
router.get("/:id", postController.show);
router.post("/", middlewareStore, postController.store);
router.put("/:id", postController.update);
router.patch("/:id", postController.modify);
router.delete("/:id", postController.destroy);

module.exports = router;
