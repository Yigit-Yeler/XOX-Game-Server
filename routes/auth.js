import express from 'express'
import { register } from '../controllers/auth.js'
const router = express.Router()

//  /auth

router.post("/register", register)

export default router