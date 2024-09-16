const express = require('express')
const router = express.Router();

const { createPost, getAllPost, getPost, deletePost, getAllUserPost, likeUnlikePost } = require('../controllers/postController');

router.post('/', createPost);
router.get('/getPost/:id',getPost);
router.get('/getAllUserPost/:id',getAllUserPost);
router.get('/getAllPost/:id', getAllPost); //self all post including his friends all posts 
router.put('/likeUnlikePost/:id', likeUnlikePost);
router.delete('/deletePost/:id', deletePost);

module.exports = router;