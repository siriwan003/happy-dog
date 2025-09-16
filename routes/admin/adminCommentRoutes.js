import express from 'express'
import { getAllComments,adminUpdateComment,adminDeleteComment  } from '../../controllers/admin/adminCommentController'

const router = express.Router()

router.get("/comments", getAllComments)       
router.put("/comment/:id", adminUpdateComment)
router.delete("/comment/:id", adminDeleteComment)

export default router