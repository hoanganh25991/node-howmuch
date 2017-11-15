import mongoose from "mongoose"

export const getAll = () => {
  const Answer = mongoose.model("Answer")
  const wait   = Answer.find({}).exec()
  return wait.catch(err => err)
}