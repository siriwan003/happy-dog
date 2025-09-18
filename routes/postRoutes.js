import { Router } from "express"
import { createPost, deletePost, updatePost } from "../controllers/postController.js"

const router = Router()


// router.get('/posts')
// router.get('/posts/:id')
router.put("/post/:id", updatePost)
router.post("/posts", createPost)  
router.delete("/posts/:id", deletePost)

export default router
