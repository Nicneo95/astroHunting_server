// required dependencies
const express = require("express");
// set up router
const router = express.Router();
const { getPosts, createPosts, updatePosts, deletePosts } = require("../controllers/postsControllers")

// display post
router.get('/', getPosts);

// create post
router.post('/', createPosts);

// update post
router.put('/:id', updatePosts);

// delete post
router.delete('/:id', deletePosts);

// export to index.js
module.exports = router