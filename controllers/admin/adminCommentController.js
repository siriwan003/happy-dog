import Comment from "../models/comment.js"

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("userID")
      .populate("postID")
    return res.status(200).json({ status: 200, comments })
  } catch (error) {
    console.error("Get all comments error:", error)
    return res.status(500).json({ status: 500, message: "Internal server error." })
  }
}

export const adminUpdateComment = async (req, res) => {
  const { id } = req.params
  const updates = req.body

  try {
    const comment = await Comment.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })

    if (!comment) {
      return res.status(404).json({ status: 404, message: "Comment not found." });
    }

    return res.status(200).json({ status: 200, message: "Comment updated successfully.", comment })
  } catch (error) {
    console.error("Admin update comment error:", error)
    return res.status(500).json({ status: 500, message: "Internal server error." });
  }
}

export const adminDeleteComment = async (req, res) => {
  const { id } = req.params

  try {
    const comment = await Comment.findByIdAndDelete(id)

    if (!comment) {
      return res.status(404).json({ status: 404, message: "Comment not found." })
    }

    return res.status(200).json({ status: 200, message: "Comment deleted successfully." })
  } catch (error) {
    console.error("Admin delete comment error:", error);
    return res.status(500).json({ status: 500, message: "Internal server error." })
  }
};
