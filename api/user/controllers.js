const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (password.length < 6)
      res.status(400).json("password length must be at least 6 characters");

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      _id: newUser._id,
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      exp: Date.now() + +process.env.EXPTIMER,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    console.log("!!!!!", payload);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const user = req.user;
  console.log("user", user);
  const payload = {
    _id: user._id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    exp: Date.now() + +process.env.EXPTIMER,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY);
  res.status(201).json({ token });
};
