const Razorpay = require("razorpay");
require("dotenv").config();

const collectPayment = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RZP_KEY_ID,
      key_secret: process.env.RZP_KEY_SECRET,
    });

    const options = {
      amount: 50000,
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    instance.orders.create(options, function (err, order) {
      if (err) {
        console.error({ error: err });
        return res.status(500).json({ message: "Error creating order" });
      }
      console.log({ order });

      res.status(200).json({ order });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { collectPayment };
