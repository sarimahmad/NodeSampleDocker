const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const { user } = req.session;

  if (!user) {
    return res.status(401).json({ status: "fail", message: "unauthorized" });
  }

  req.user = user;

  next();
};



const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send({message:"A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(token,process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};


module.exports = {
  protect, 
  verifyToken
};
