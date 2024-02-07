// import { QuizData } from "../utils/QuizData"
const QuizData = require('../utils/QuizData');


exports.sendQuiz = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data:QuizData
    })
  } catch (error) {
    console.log(error);
  }
}