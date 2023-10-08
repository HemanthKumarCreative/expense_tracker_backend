// routes/orders.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // Assuming you have imported the Order model
const User = require("../models/User");
const { checkAuthorization } = require("../controllers/AuthController");

router.post("/", checkAuthorization, async (req, res) => {
  const { id, user_id, payment_id, status } = req.body;
  const user = await User.findByPk(user_id);

  try {
    const order = await Order.create({ id, user_id, payment_id, status });
    await user.update({ isPremiumUser: true });
    const updatedUser = await User.findByPk(user_id);
    return res.status(201).json({ order, updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
