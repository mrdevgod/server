import pool from "../../db.js"

import {
  getQuestionsQuery,
  addQuestionQuery,
  getQuestionsWithFilterQuery,
} from "./queries.js"

export const getQuestions = (req, res) => {
  const limit = parseInt(req.query.limit)
  pool.query(getQuestionsQuery, [limit], (error, results) => {
    if (error) throw error
    res.status(200).send(results.rows)
  })
}

export const getQuestionsWithFilter = (req, res) => {

  const { year_q, session_q, specialization } = req.query

  pool.query(getQuestionsWithFilterQuery, [year_q, session_q, specialization], (error, results) => {
    if (error) throw error
    res.status(200).send(results.rows)
  })
}

export const addQuestion = (req, res) => {
  pool.query(
    addQuestionQuery,
    [
      req.body.question,
      req.body.options_q,
      req.body.answer,
      req.body.flag_q,
      req.body.year_q,
      req.body.session_q,
      req.body.specialization,
      req.body.image,
    ],
    (error) => {
      if (error) throw error
      res.status(200).send("Question added successfully.")
    }
  )
}
