const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });
    // User authenticated successfully
    await user.update({ isSignedIn: true });

    // Create a JWT token
    const token = jwt.sign({ userId: user.id }, "apple", {
      expiresIn: "1h",
    });

    // Set the token as a cookie
    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({ message: "Sign Up successful", user, token });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ message: "Email already exists" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = {
  signup,
};
