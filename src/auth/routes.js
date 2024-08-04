import express from 'express'
import { changePassword, signin, signup } from './controller.js'

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/changePassword', changePassword)

export default router