const User = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createError = require("../../utils/createError");
const crypto = require("crypto");

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

  const newUser = new User(
    name,
    email,
    password,
   
  );
// send email verification to user 



  try {
    await newUser.save();
    res.json("Signup successfull");
  } catch (error) {
    next(error);
  }
  console.log(emailToken);
}
//token




//verify email

const verifyEmail = async (req, res, next) => {
  try {
    const emailToken = req.body.emailToken;
    if (!emailToken) {
      next(createError("Required", "ValidationError"));
    }
    const user = await User.findOne({ emailToken });
    if (user) {
      user.emailToken = null;
      user.isVerified = true;

      await user.save();

      const token = signToken(user._id);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
        isVerified: user?.isVerified,
      });
    } else {
      next(createError("Email verification failed", "NotFoundError"));
    }
  } catch (error) {
    next(error);
  }
};

//login

async function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(createError("All field are required", "ValidationError"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(createError("user not found", "ValidationError"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      next(createError("invalid password", "ValidPassword"));
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
  verifyEmail,
};
