const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.SignUpUser = async (req, res, next) => {
  const { email, password } = req.body;
  const hasPassword = await bcrypt.hash(password, 12);

  try {
    const userExits = await User.findOne({ email });
    if (userExits) {
      return res.status(404).json({
        status: "failure",
        data: "User with this email exits",
      });
    }

    const user = await User.create({ email, password: hasPassword });

    const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });
    user.token = token;
    req.session.user = user;
    
    
    res.status(200).json({
      status: "succes",
      data: user,
    });
  } catch (e) {
    res.status(400).json({
      status: "fails",
      error: e,
    });
  }
};

exports.LoginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "failure",
        data: "User Not Found",
      });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      req.session.user = user;
      console.log("NOT");

      const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });
      user.token = token;
      return res.status(200).json({
        status: "succes",
        data: user,
      });
    } else {
      return res.status(400).json({
        status: "Failure",
        data: "Password does not match",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "fails",
      error: e,
    });
    return;
  }
};
