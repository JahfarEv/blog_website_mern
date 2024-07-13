const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required:[true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    minLength: 6,
    required:[ true, "Password is required"]
  },
  verified:{type:Boolean, default:false},

},
{ timestamps: true }
)
// userSchema.pre(
//   "save",
//   async function (next) {
//     const user = this;
//     if (!user.isModified("password")) return next();
//     try {
//       const hashedPassword = await bcrypt.hash(user.password, 10);
//       user.password = hashedPassword;
//       next();
//     } catch (error) {
//       console.error("Error hashing password:", error);
//       next(error);
//     }
//   },


const User = mongoose.model("User", userSchema);
module.exports = User;
