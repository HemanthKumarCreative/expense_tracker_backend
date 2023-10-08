const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(async function (email, password, done) {
      try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        const isValidPassword = await user.isValidPassword(password);

        if (!isValidPassword) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};
