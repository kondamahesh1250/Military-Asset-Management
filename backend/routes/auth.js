const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

router.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) return res.status(400).json("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.SECRET_KEY,
  );

  res.json({ token, role: user.role });
});

module.exports = router;