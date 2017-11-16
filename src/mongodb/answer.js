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

export const updateAnswerSession = data => {
  const Answer = mongoose.model("Answer")
  const { sessionId } = data
  return Answer.update({ sessionId }, data, { upsert: true })
    .exec()
    .catch(err => err)
}

export const getSummary = async sessionId => {
  const Answer = mongoose.model("Answer")
  const answer = await Answer.findOne({ sessionId })
    .exec()
    .catch(err => err)

  // Do compute logic with answer

  return {
    summary: Math.floor(Math.random() * 10000),
    ratio: 1.35
  }
}
