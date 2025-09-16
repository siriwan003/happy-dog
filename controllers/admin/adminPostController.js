import Post from "../models/post.js"

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userID").populate("cagatorycommuID")
    return res.status(200).json({ status: 200, posts })
  } catch (error) {
    console.error("Get all posts error:", error)
    return res.status(500).json({ status: 500, message: "Internal server error." })
  }
}

export const adminUpdatePost = async (req, res) => {
  const { id } = req.params
  const updates = req.body;

  try {
    const post = await Post.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })

    if (!post) {
      return res.status(404).json({ status: 404, message: "Post not found." })
    }

    return res.status(200).json({ status: 200, message: "Post updated successfully.", post })
  } catch (error) {
    console.error("Admin update post error:", error)
    return res.status(500).json({ status: 500, message: "Internal server error." })
  }
}


export const adminDeletePost = async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ status: 404, message: "Post not found." })
    }

    return res.status(200).json({ status: 200, message: "Post deleted successfully." })
  } catch (error) {
    console.error("Admin delete post error:", error)
    return res.status(500).json({ status: 500, message: "Internal server error." })
  }
}
