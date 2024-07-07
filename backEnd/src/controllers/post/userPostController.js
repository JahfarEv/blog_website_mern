const Post = require("../../models/postSchema");
const createError = require("../../utils/createError");
const mongoose = require("mongoose");

//create new post

async function newPost(req, res, next) {
  const { title, description, image } = req.body;
  console.log(title, description, image);
  if (!title || !description || !image) {
    next(createError("All field are required", "ValidationError"));
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
    next(createError("posts not found", "NotFoundError"));
  }
  res.status(200).json({
    status: "success",
    data: posts,
  });
  next();
}

//get post by id

async function getPostById(req, res, next) {
  const {id} = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    next(createError("Required post id", "ValidationError"));
  }
  const post = await Post.findById({_id:id});
  if (!post) {
    next(createError("post not found", "NotFoundError"));
  }
  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
}

//update post

async function editPost(req, res, next) {
  const { id } = req.params;
  try {
    const { title, image, description } = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      next(createError("id required", "ValidationError"));
    }

    const updatePost = await Post.findByIdAndUpdate(
      id,
      { title, image, description },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Post updated successfully",
      data: {
        updatePost,
      },
    });
  } catch (error) {
    next(error);
  }
}

//delete post

async function deletePost(req, res, next) {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    next(createError("Required post id", "ValidationError"));
  }
  const deletePost = await Post.findByIdAndDelete({ _id: id });
  if (!deletePost) {
    next(createError("Post not foud", "NotFoundError"));
  }
  return res.status(200).json({
    status: "success",
    message: "Successfully deleted",
  });
}

module.exports = {
  newPost,
  getPost,
  editPost,
  deletePost,
  getPostById
};
