import mongoose from "mongoose"

export const getAll = () => {
  const Question = mongoose.model("Question")
  return Question.find({})
    .exec()
    .catch(err => err)
}

export const next = ({ order, questionIds }) => {
  const Question = mongoose.model("Question")
  return Question.findOne({
    order: {
      $gte: order
    },
    _id: {
      $nin: questionIds
    }
  })
    .sort({ order: -1 })
    .exec()
    .catch(err => err)
}
