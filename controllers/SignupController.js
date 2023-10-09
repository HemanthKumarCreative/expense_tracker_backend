const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });
    await user.update({ isSignedIn: true });

    const token = jwt.sign({ user }, "apple", {
      expiresIn: "1h",
    });

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
