const express = require('express')
const postController = require("../controllers/postcontroller");
const protection = require("../middlewares/authmiddleware");
const router = express.Router();


//localhost:3000/

router
.route("/posts")
.get(protection.verifyToken,postController.getAllPosts)
.post(postController.CreatePost);

router
.route("/posts/:id")
.get(postController.getOnePosts)
.patch(postController.UdpatePost)

module.exports = router;
