const jwt = require("jsonwebtoken");

const checkAuthorization = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    const decodedToken = jwt.verify(token, "apple");
    req.user = decodedToken.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid authorization token" });
  }
};

module.exports = {
  checkAuthorization,
};
