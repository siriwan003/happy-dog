import express from 'express'
import { getAllUser, deleteUser } from "../controllers/adminUserController.js";

const router = express.Router();

// จัดการโพส
router.get("/User", getAllUser);         
router.delete("/User/:id", deleteUser); 

export default router;
