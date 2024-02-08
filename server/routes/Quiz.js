const express = require('express');
const { auth } = require('../middlewares/Auth');
const { sendQuiz,setAttemptedTrue } = require('../controllers/Quiz');
const router = express.Router();

router.get('/allQuizData', sendQuiz);
router.put('/setAttemptedTrue',auth, setAttemptedTrue);

module.exports = router;