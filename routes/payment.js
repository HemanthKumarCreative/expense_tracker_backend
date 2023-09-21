const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

router.post("/", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: "rzp_test_PPWdPOnQ2XuMkp", // Your Razorpay Key ID
      key_secret: "fWD1Veag74rChnn7YKUUwPDM", // Your Razorpay Key Secret
    });

    const options = {
      amount: 50000, // amount in the smallest currency unit (50,000 paisa = 500 INR)
      currency: "INR",
      receipt: "order_rcptid_11", // A unique identifier for this order
    };

    // Create the order using Razorpay
    instance.orders.create(options, function (err, order) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error creating order" });
      }
      console.log({ order });

      // Send the order details to the client
      res.status(200).json({ order });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
