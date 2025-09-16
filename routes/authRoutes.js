import express from 'express'
import { register, profile, login, updateUser, deleteUser } from '../controllers/authController.js'

const route = express.Router()

route.put("/update/:id", updateUser)
route.get('/profile/:id',profile)
route.post('/register', register)
route.post('/login', login)
route.delete('/delete/:id', deleteUser)


export default route