import Comment from "../models/comment.js"

export const Createcomment = async (req, res) => {
  try {
    const { userID, postID, content } = req.body

    if (!userID) {
      return res.status(400).json({ status: 400, message: "userId is required." })
    }
    if (!postID) {
      return res.status(400).json({ status: 400, message: "postId is required." })
    }
//ีการแนบไฟล์รูปภาพ
    const imageurl = req.file ? `/uploads/${req.file.filename}` : null

    const comment = new Comment({
      userID,
      postID,
      content,
      imageurl,
    })

    await comment.save()

    return res.status(201).json({status: 201,message: "Comment created successfully.",comment, })
  } catch (error) {
    console.error("Create comment error:", error)
    return res.status(500).json({ status: 500, message: "Internal server error." })
  }
}

export const updatecomment = async (req, res) => {
  const { id } = req.params
  const updates = req.body
  try {
    //มีการแนบมาใหม่
    if (req.file) {
      updates.imageurl = `/uploads/${req.file.filename}`
    }

    const comment = await Comment.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })

    if (!comment) {
      return res.status(404).json({ status: 404, message: "Comment not found." })
    }
    return res.status(200).json({status: 200,message: "Comment updated successfully.",comment,})

  } catch (error) {
    console.error("Update comment error:", error)
    return res.status(500).json({ status: 500, message: "Internal server error." })
  }
}

export const deletecomment = async (req, res) => {
  const { id } = req.params
  try {
    const comment = await Comment.findByIdAndDelete(id)

    if (!comment) {
      return res.status(404).json({ status: 404, message: "Comment not found." })
    }

    return res .status(200).json({ status: 200, message: "Delete comment successfully" })
  } catch (error) {
    console.error("Delete comment error:", error)
    return res.status(500).json({ status: 500, message: "Internal server error." })
  }
}
