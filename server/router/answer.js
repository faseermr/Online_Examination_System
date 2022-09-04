const express = require('express');
const router = express.Router();
const {postAnswer,checkAnswer,getAnswerByStudent,updateAnswer,submitAnswer} = require('../controller/answer');
const { checkAnswerExist,checkFeildsAreEmpty } = require('../middleware');

router.post('/',checkFeildsAreEmpty,checkAnswerExist,postAnswer)

router.get('/:student',checkAnswer)

router.get('/student/:student',getAnswerByStudent)

router.put('/update/:ansid',updateAnswer)

router.post('/submit',submitAnswer)

module.exports = router;