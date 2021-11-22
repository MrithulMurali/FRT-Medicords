const jwt = require("jsonwebtoken");

// create a middleware

const auth = (req, res, next) => {
  const token = req.header("x-access-token");

  if (!token) {
    return res
      .status(406)
      .json({ error: "No authentication token, Authorization denied!" });
  }
  const isVerified = jwt.verify(token, process.env.JWT_SECRET);

  if (!isVerified) {
    return res.status(406).json({ err: "Token verification failed" });
  }
  req.user_id = isVerified.id;
  next();
};

module.exports = auth;
