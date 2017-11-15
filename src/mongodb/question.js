import mongoose from "mongoose"

export const getAll = () => {
  const Question = mongoose.model("Question")
  const wait     = Question.find({}).exec()
  return wait.catch(err => err)
}