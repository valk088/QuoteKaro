const User = require("../models/user");

const loginOrRegisterUser = async (req, res) => {
  const { uid, email } = req.user;

  try {
    let user = await User.findOne({ firebaseUID: uid });

    if (!user) {
      // New user, create profile
      user = new User({
        firebaseUID: uid,
        email
        
      });
      await user.save();
    }

    res.status(200).json({ message: "Logged in", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};

module.exports = { loginOrRegisterUser };
