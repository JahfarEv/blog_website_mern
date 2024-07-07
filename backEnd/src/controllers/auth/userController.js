const User = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createError = require("../../utils/createError");

const signToken = (id) => {
  return jwt.sign({ id, isAdmin: false }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};

async function signup(req, res, next) {
  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    name === "" ||
    email === "" ||
    password === ""
  ) {
    next(createError("All field are required", "ValidationError"));
  }

  const newUser = new User({
    name,
    email,
    password,
  });
  try {
    await newUser.save();
    res.json("Signup successfull");
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    throw createError("All field are required", "ValidationError");
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      throw createError("user not found", "ValidationError");
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      throw createError("invalid password", "ValidPassword");
    }

    const token = signToken(validUser._id);

    res.status(200).json({
      status: "success",
      token,
      validUser,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
  login,
};
