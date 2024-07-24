import express from 'express'

import { getQuestions, addQuestion, getQuestionsWithFilter } from './controller.js'

const router = express.Router()

router.get('/', getQuestions)
router.get('/getQuestionsWithFilter', getQuestionsWithFilter)
router.post('/addQuestion', addQuestion)

export default router