// const express = require("express");
// const router = express.Router();
// const PostController = require("../controllers/postController");
// const upload = require("../config/multer");

// router.post("/", PostController.createPost);
// router.get("/", PostController.getPosts);
// router.put("/:id", PostController.updatePost);
// router.delete("/:id", PostController.deletePost);
// router.post("/", upload.single("image"), PostController.createPost);
// router.put("/:id", upload.single("image"), PostController.updatePost);

// module.exports = router;

const express = require("express");
const router = express.Router();

const PostController = require("../controllers/postController");
const upload = require("../config/multer");

// CREATE POST
router.post("/", upload.single("image"), PostController.createPost);

// GET POSTS
router.get("/", PostController.getPosts);

// UPDATE POST
router.put("/:id", upload.single("image"), PostController.updatePost);

// DELETE POST
router.delete("/:id", PostController.deletePost);

module.exports = router;
