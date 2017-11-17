import express from "express"
import { getAll as getAllQues, next as findNextQues, importList as importQues } from "../mongodb/question"
import { getAll as getAllAns, findAns, updateAns, getSummary } from "../mongodb/answer"

const a = express.Router()

const GET_ALL_QUESTIONS = "GET_ALL_QUESTIONS"
const FIND_NEXT_QUESTION = "FIND_NEXT_QUESTION"
const IMPORT_QUESTIONS = "IMPORT_QUESTIONS"

const GET_ALL_ANSWERS = "GET_ALL_ANSWERS"
const FIND_ANSWER = "FIND_ANSWER"
const UPDATE_ANSWER = "UPDATE_ANSWER"
const SUMMARY_ANSWER = "SUMMARY_ANSWER"

a.post("/questions", async (req, res) => {
  const { type } = req.body

  switch (type) {
    case GET_ALL_QUESTIONS: {
      const questions = await getAllQues()
      return res.json({ questions })
    }
    case FIND_NEXT_QUESTION: {
      const { order, questionIds } = req.body
      const question = await findNextQues({ order, questionIds })
      return res.json({ question })
    }
    case IMPORT_QUESTIONS: {
      const { questions } = req.body
      const savedQues = await importQues(questions)
      return res.json({ questions: savedQues })
    }
    default: {
      const questions = await getAllQues()
      return res.json({ questions })
    }
  }
})

a.post("/answers", async (req, res) => {
  const { type } = req.body

  switch (type) {
    case GET_ALL_ANSWERS: {
      const answers = await getAllAns()
      return res.json({ answers })
    }
    case FIND_ANSWER: {
      const { sessionId } = req.body
      const answer = await findAns(sessionId)
      return res.json({ answer })
    }
    case SUMMARY_ANSWER: {
      const { summary, ratio } = await getSummary(req.body.sessionId)
      return res.json({ summary, ratio })
    }
    case UPDATE_ANSWER: {
      const answer = await updateAns(req.body)
      return res.json({ answer })
    }
    default: {
      const answers = await getAllAns()
      return res.json({ answers })
    }
  }
})

export const router = a
