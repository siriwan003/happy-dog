import Post from '../models/post.js'
import fs from 'fs'
import path from 'path'

export const createPost = async (req, res) => {
  try {
    const { userID, cagatorycommuID, title, content } = req.body

    if (!userID) {
      return res.status(400).json({ status: 400, message: "userID is required." })
    }
    if (!cagatorycommuID) {
      return res.status(400).json({ status: 400, message: "cagatorycommuID is required." })
    }

    const post = new Post({
      userID,
      cagatorycommuID,
      title,
      content,
      imageurl: req.file ? `/uploads/${req.file.filename}` : null 
    })

    await post.save()
    return res.status(201).json({
      status: 201,
      message: "Post created successfully.",
      post
    })
  } catch (error) {
    console.error("Create error:", error)
    return res.status(500).json({ status: 500, message: "Internal server error." })
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params
  try {
    const updates = {
      ...req.body,
      ...(req.file && { imageurl: `/uploads/${req.file.filename}` })
    }

    const post = await Post.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })

    if (!post) {
      return res.status(404).json({ status: 404, message: "Post not found." })
    }

    return res.status(200).json({
      status: 200,
      message: "Post updated successfully.",
      post
    })
  } catch (error) {
    console.error("Update error:", error)
    return res.status(500).json({ status: 500, message: "Internal server error." })
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params
  try {
    const post = await Post.findByIdAndDelete(id)

    if (!post) {
      return res.status(404).json({ status: 404, message: "Post not found." })
    }

  
    if (post.imageurl) {
      const filePath = path.join(process.cwd(), post.imageurl)
      fs.unlink(filePath, (err) => {
        if (err) console.warn("Cannot delete file:", err.message)
      })
    }

    return res.status(200).json({
      status: 200,
      message: "Delete post successfully."
    })
  } catch (error) {
    console.error("Delete error:", error)
    return res.status(500).json({ status: 500, message: "Internal server error." })
  }
}
