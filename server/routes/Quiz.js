const express = require('express');
const { auth } = require('../middlewares/Auth');
const { sendQuiz } = require('../controllers/Quiz');
const router = express.Router();

router.get('/allQuizData', sendQuiz);

module.exports = router;