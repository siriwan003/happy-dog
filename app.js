
import express from "express"
import cors from "cors"

import postRoutes from './routes/postRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cagatorycommuRoute from './routes/cagatorycommuRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

const app = express()


app.use(cors());
app.use(express.json({ limit: "1mb" }))
app.use(express.urlencoded({ extended: true }))

// routes
app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/cagatorycommu", cagatorycommuRoute);
app.use("/api/comment", commentRoutes)
app.use("/api/upload", uploadRoutes)

export default app
