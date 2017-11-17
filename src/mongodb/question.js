import mongoose from "mongoose"

const Question = mongoose.model("Question")

export const getAll = () => {
  return Question.find({})
    .exec()
    .catch(err => err)
}

export const next = ({ order, questionIds }) => {
  return Question.findOne({
    order: {
      $gte: order
    },
    _id: {
      $nin: questionIds
    }
  })
    .sort({ order: 1 })
    .exec()
    .catch(err => err)
}

export const importList = questions => {
  const waits = questions.map(question => {
    const { text } = question
    return Question.findOneAndUpdate(
      {
        text
      },
      question,
      {
        upsert: true,
        new: true
      }
    )
      .exec()
      .catch(err => err)
  })

  return Promise.all(waits)
}
