import express from 'express'
import {getAll as getAllQuestions} from "../mongodb/question";
import {getAll as getAllAnswers} from "../mongodb/answer";

const _router = express.Router();

_router.get('/questions', async (req, res) => {
  const questions = await getAllQuestions()
  res.json({ questions });
})


_router.get('/answers', async (req, res) => {
  const answers = await getAllAnswers()
  res.json({ answers });
})

export const router = _router