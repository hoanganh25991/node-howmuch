import mongoose from "mongoose"

export const getAll = () => {
  const Answer = mongoose.model("Answer")
  return Answer.find({})
    .exec()
    .catch(err => err)
}

export const getAnswerSession = sessionId => {
  const Answer = mongoose.model("Answer")
  return Answer.findOne({ sessionId })
    .exec()
    .catch(err => err)
}
