// import { QuizData } from "../utils/QuizData"
const QuizData = require('../utils/QuizData');
const User = require('../models/User');


exports.sendQuiz = async (req, res) => {
  try {

    // console.log("QUIZ JSON from server", QuizData);
    return res.status(200).json({
      success: true,
      data:QuizData
    })
  } catch (error) {
    console.log(error);
  }
}
exports.setAttemptedTrue = async (req, res) => {
  try {
    const userId = req.user.id;
    const { score } = req.body;
    
    const sol = await User.findByIdAndUpdate(userId, { attempted: true,marks:score }, { new: true });
    console.log("UPDATED USER",sol)

    return res.status(200).json({
      success: true,
      sol,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
			success: false,
			message: "Error in marking the test ",
			error: error.message,
		});
  }
}