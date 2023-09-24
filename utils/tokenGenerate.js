const crypto = require("crypto");

// Generate a random token
const generateRandomToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(20, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString("hex"));
      }
    });
  });
};

module.exports = { generateRandomToken };
