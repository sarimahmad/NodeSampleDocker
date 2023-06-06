const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, "User must has email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User must have password"],
  },
  token: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
