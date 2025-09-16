import express from 'express'
import { getAllPosts, adminUpdatePost, adminDeletePost } from "../controllers/adminPostController.js";

const router = express.Router()

router.get("/posts", getAllPosts)       
router.put("/posts/:id", adminUpdatePost)
router.delete("/posts/:id", adminDeletePost)

export default router
