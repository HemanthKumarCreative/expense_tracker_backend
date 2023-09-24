const express = require("express");
const { tranEmailApi } = require("../utils/mailTransporter"); // Import the transporter
const { generateRandomToken } = require("../utils/tokenGenerate");
const router = express.Router();
const User = require("../models/User"); // Assuming you have a User model

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const resetToken = await generateRandomToken(); // Implement your own token generation logic
  const sender = {
    email: "avisihk@gmail.com",
  };
  console.log({ resetToken });
  const receivers = [{ email: email }];
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.update({ resetToken });

    // Send a password reset email
    await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Password Reset",
      htmlContent: `
        <p>Hello,</p>
        <p>Please click the following link to reset your password:</p>
        <a href="http://localhost:3000/reset-password?token=${resetToken}">Reset Password</a>
      `,
    });

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
