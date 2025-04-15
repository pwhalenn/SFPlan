const User = require("../models/userModel");
const { generateToken } = require("../config/auth");

const authController = {
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.create({ username, password });
      const token = generateToken(user._id);
      // req.session.token = token;

      res.redirect("/auth/login");
    } catch (err) {
      console.error("Register error:", err);
      res.status(500).json({ message: "Registration failed" });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt:", username, password);
    try {
      const user = await User.findOne({ username });
      console.log("User found:", user);

      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await user.comparePassword(password);
      console.log("Password match:", isMatch);

      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      const token = generateToken(user._id);
      console.log("Generated token:", token);

      req.session.token = token;
      req.session.user = { id: user._id, username: user.username };

      res.redirect("/pesanan");

    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Login failed" });
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie("token"); 
        res.redirect("/auth/login");
    });
  },
};

module.exports = authController;