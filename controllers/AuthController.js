const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkAuthorization = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.params.user_id = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid authorization token" });
  }
};

module.exports = {
  checkAuthorization,
};
