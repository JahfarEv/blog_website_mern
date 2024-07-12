const User = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createError = require("../../utils/createError");
const crypto = require("crypto");
const hashString = require("../../utils/index");
const { sendVerificationEmail } = require("../../utils/sendEmail");
const user = require("../../models/userSchema");

// const signToken = (id) => {
//   return jwt.sign({ id, isAdmin: false }, process.env.SECRET_STR, {
//     expiresIn: process.env.LOGIN_EXPIRES,
//   });
// };

// async function signup(req, res, next) {
//   const { name, email, password } = req.body;

//   if (
//     !name ||
//     !email ||
//     !password ||
//     name === "" ||
//     email === "" ||
//     password === ""
//   ) {
//     next(createError("All field are required", "ValidationError"));
//   }

//   const newUser = new User(name, email, password);
//   // send email verification to user

//   try {
//     await newUser.save();
//     res.json("Signup successfull");
//   } catch (error) {
//     next(error);
//   }
//   console.log(emailToken);
// }
// //token

// //verify email

// const verifyEmail = async (req, res, next) => {
//   try {
//     const emailToken = req.body.emailToken;
//     if (!emailToken) {
//       next(createError("Required", "ValidationError"));
//     }
//     const user = await User.findOne({ emailToken });
//     if (user) {
//       user.emailToken = null;
//       user.isVerified = true;

//       await user.save();

//       const token = signToken(user._id);
//       res.status(200).json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         token,
//         isVerified: user?.isVerified,
//       });
//     } else {
//       next(createError("Email verification failed", "NotFoundError"));
//     }
//   } catch (error) {
//     next(error);
//   }
// };

async function register(req, res, next) {
  const { name, email, password } = req.body;

  //validate fields
  if (!(name || email || password)) {
    next(createError("Provide reuired field", "ValidationError"));
  
  }
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      next(createError("Email already exists", "ValidationError"));
      return;
    }

    const hashedPassword = await hashString(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,

      //send email verification to user
    });
    sendVerificationEmail(user, res);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
}

//login

async function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(createError("All field are required", "ValidationError"));
  }
  try {
    const validUser = await User.findOne({ email })
      .select("+password")
      .populate({
        path: "friends",
        select: "name location profilrUrl -password",
      });
    if (!validUser) {
      next(createError("user not found", "ValidationError"));
    }
    if (!validUser?.verified) {
      next(createError("User email is not verified", "ValidationError"));
    }
    // const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword?.verified) {
      next(createError("invalid password", "ValidPassword"));
    }

    //compare password
    const isMatch = await compareString(password, validUser?.password);
    if (!isMatch) {
      next(createError("Invalid email or password"));
    }
    user.password = undefined;

    const token = createJWT(validUser._id);

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
  register,
  login,
  
};
