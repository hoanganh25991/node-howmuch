import express from "express"
import { getAll as getAllQuestions, next as getNextQuestion } from "../mongodb/question"
import { getAll as getAllAnswers, getAnswerSession, updateAnswerSession, getSummary } from "../mongodb/answer"

const _router = express.Router()

_router.get("/questions", async (req, res) => {
  const questions = await getAllQuestions()
  res.json({ questions })
})

_router.post("/questions/next", async (req, res) => {
  const { order, questionIds } = req.body
  const question = await getNextQuestion({ order, questionIds })
  res.json({ question })
})

_router.get("/answers", async (req, res) => {
  const answers = await getAllAnswers()
  res.json({ answers })
})

_router.post("/answers/sessionId", async (req, res) => {
  const { sessionId } = req.body
  const answer = await getAnswerSession(sessionId)
  res.json({ answer })
})

_router.put("/answers/sessionId", async (req, res) => {
  const answer = await updateAnswerSession(req.body)
  res.json({ answer })
})

_router.post("/summary/sessionId", async (req, res) => {
  const { summary, ratio } = await getSummary(req.body.sessionId)
  res.json({ summary, ratio })
})

export const router = _router
