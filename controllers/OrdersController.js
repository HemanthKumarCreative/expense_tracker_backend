const Order = require("../models/Order");
const User = require("../models/User");

const createOrder = async (req, res) => {
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
};

module.exports = {
  createOrder,
};
