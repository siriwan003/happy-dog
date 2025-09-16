import {Router} from 'express'
import {Createcomment,updatecomment,deletecomment} from '../controllers/commentController.js'

const router = Router()


router.put('/comment/update', updatecomment)
router.post('/comment', Createcomment)
router.delete('/comment/:id', deletecomment)

export default router