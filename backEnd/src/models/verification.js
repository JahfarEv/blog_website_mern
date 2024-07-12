const mongoose = require('mongoose');

const verificationSchema = mongoose.Schema({
    userId:String,
    token:String,
    createdAt:Date,
    expiresAt:Date,
});

const Verification = mongoose.model("Verification", verificationSchema);
module.exports = Verification;