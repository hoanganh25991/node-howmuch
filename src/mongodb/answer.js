import mongoose from "mongoose"

const _ = console.log
const ratio = 1.35
export const PLATFORM = "PLATFORM"
export const MULTIPLY = "MULTIPLY"
const platforms = ["ios", "android", "web"]

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

export const computeSummary = answers => {
  // Find platform answer
  const platormAnsArr = answers.filter(ans => ans.type === PLATFORM)
  const rootmultiply = platormAnsArr.reduce((carry, ans) => ({ ...carry, ...ans.multiply }), {})

  platforms.forEach(platform => {
    const notChoosen = typeof rootmultiply[platform] === "undefined"
    if (notChoosen) rootmultiply[platform] = 0
  })

  _("multiply", rootmultiply)

  const multiplyAnsArr = answers.filter(ans => ans.type === MULTIPLY).map(ans => ans.multiply)

  _("multiplyAnsArr", multiplyAnsArr)

  const lastMultiply = multiplyAnsArr.reduce((carry, multiply) => {
    const { ios: li = 1, android: la = 1, web: lw = 1 } = carry
    const { ios: ni = 1, android: na = 1, web: nw = 1 } = multiply
    return { ios: li * ni, android: la * na, web: lw * nw }
  }, rootmultiply)

  _("lastMultiply", lastMultiply)

  const multiplyTotal = Object.keys(lastMultiply).reduce((carry, key) => carry + lastMultiply[key], 0)

  _("multiplyTotal", multiplyTotal)

  // Compute summary
  const normalAnsArr = answers.filter(ans => ans.type !== PLATFORM && ans.type !== MULTIPLY)

  // Do compute logic with answer
  return normalAnsArr.reduce((carry, ans) => {
    const { pay, fixed_pay } = ans
    return carry + fixed_pay + pay * multiplyTotal
  }, 0)
}

export const getSummary = async sessionId => {
  const Answer = mongoose.model("Answer")
  const answer = await Answer.findOne({ sessionId })
    .exec()
    .catch(err => err)

  const answers = (answer && answer.answers) || []
  const summary = computeSummary(answers)
  return { summary, ratio }
}
