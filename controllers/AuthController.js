const jwt = require("jsonwebtoken");

const checkAuthorization = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    const decodedToken = jwt.verify(token, "apple");
    req.params.id = decodedToken.user.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid authorization token" });
  }
};

module.exports = {
  checkAuthorization,
};
