const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    image: {
        data:Buffer,
        type:String
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
},
  { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);