const Post = require("../../models/postSchema");
const createError = require("../../utils/createError");

//create new post

async function newPost(req, res, next) {
  const { title, description, image } = req.body;
  console.log(title, description, image);
  if (!title || !description || !image) {
    throw createError("All field are required", "ValidationError");
  }

  const newPost = await Post.create({ title, description, image });
  res.status(201).json({
    status: "success",
    data: {
      Post: newPost,
    },
  });
}

//find post

async function getPost(req, res, next) {
  const posts = await Post.find().sort({ createdAt: -1 });
  if (!posts) {
    throw createError("posts not found", "NotFoundError");
  }
  res.status(200).json({
    status: "success",
    data: posts,
  });
  next();
}

//update post

//delete post

module.exports = {
  newPost,
  getPost
};
