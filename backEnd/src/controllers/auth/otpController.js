const mongoose = require("mongoose");
const Verification = require("../../models/verification");
const User = require("../../models/userSchema");

const verifyEmail = async (req, res) => {
  const { userId, token } = req.params;

  try {
    const result = await Verification.findOne({ userId });
    if (result) {
      const { expiresAt, token: hashedToken } = result;
      if (expiresAt < Date.now()) {
        Verification.findOneAndDelete({ userId })
        .then(()=>{
            User.findOneAndDelete({_id:userId})
            .then(()=>{
                const message = "Verification token are expired";
                res.redirect()
            })
        })
      }
    }
  } catch (error) {
    console.log(error);
  }
};
