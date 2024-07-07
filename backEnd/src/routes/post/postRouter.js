const express = require('express')
const postController = require('../../controllers/post/userPostController');
const uploadCloudinary = require('../../middlewares/multer');

const postRouter = express.Router();

postRouter
.post('/post',uploadCloudinary,postController.newPost)
.get('/get-post',postController.getPost)

module.exports = postRouter