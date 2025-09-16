import express from 'express'
import multer from 'multer'
import path from 'path'
import Post from '../models/post.js'  

const router = express.Router()

// Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })


router.post('/', upload.single('test'), async (req, res) => {
  try {
    
    const imageUrl = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`

    // สร้าง post
    const newPost = new Post({
      userId: req.body.userId,               
      cagatorycommuID: req.body.cagatorycommuID, 
      imageUrl: imageUrl
    })

    await newPost.save()

    res.json({ message: 'Upload success!', post: newPost })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

