import { Router } from "express"
import multer from "multer"
import { createPost, deletePost, updatePost } from "../controllers/postController.js"

const router = Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/") 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})
const upload = multer({ storage })

// router.get('/posts')
// router.get('/posts/:id')
router.put("/post/:id", updatePost)
router.post("/posts", upload.single("image"), createPost)  
router.delete("/posts/:id", deletePost)

export default router
