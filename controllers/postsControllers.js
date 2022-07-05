// @description   get/display posts
// @route         GET /posts
const getPosts = (req, res) => {
  res.status(200).json({ message: "Get Respond" });
};

// @description  create posts
// @route        POST /posts
const createPosts = (req, res) => {
  res.status(200).json({ message: "Post Respond" });
};

// @description   update posts
// @route         PUT /posts
const updatePosts = (req, res) => {
  res.status(200).json({ message: `Update Respond ${req.params.id}` });
};

// @description   delete posts
// @route         DELETE /posts
const deletePosts = (req, res) => {
  res.status(200).json({ message: `Delete Respond ${req.params.id}` });
};

// export to routes
module.exports = {
  getPosts,
  createPosts,
  updatePosts,
  deletePosts,
};
