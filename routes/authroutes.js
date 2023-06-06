const express = require('express')
const postController = require("../controllers/authController");
const router = express.Router();

//localhost:3000/

router
.route("/signup")
.post(postController.SignUpUser) ;

router
.route("/login")
.post(postController.LoginUser) ;

module.exports = router;