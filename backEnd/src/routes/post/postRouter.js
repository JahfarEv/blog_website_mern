const express = require('express')
const postController = require('../../controllers/post/userPostController');
const uploadCloudinary = require('../../middlewares/multer');

const postRouter = express.Router();

postRouter
.post('/post',uploadCloudinary,postController.newPost)
.get('/get-post',postController.getPost)
.put('/edit-post/:id',postController.editPost)
.delete('/delete-post/:id',postController.deletePost)
.get('/get-post/:id',postController.getPostById)
module.exports = postRouter