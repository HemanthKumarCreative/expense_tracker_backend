const User = require("../models/User");
const Password = require("../models/Password");
const bcrypt = require("bcrypt");

const { tranEmailApi } = require("../utils/mailTransporter");
const { generateRandomToken } = require("../utils/tokenGenerate");

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const resetToken = await generateRandomToken();
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
    await Password.create({ user_id: user.id, resetToken });

    await user.update({ resetToken });

    await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Password Reset",
      htmlContent: `
          <p>Hello,</p>
          <p>Please click the following link to reset your password:</p>
          <a href="http://localhost:3000/reset-password?token=${resetToken}&email=${email}">Reset Password</a>
        `,
    });

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedPassword });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
};
