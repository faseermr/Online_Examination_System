const express = require('express');
const router = express.Router();
const questionController =  require('../controller/question');



// get question by id
router.get('/quiz/:qid',questionController.getQuestionById)

// get question by subject
router.get('/subject/:subject',questionController.getBySubject)

// add a question
router.post('/',questionController.create)

// getAll all question
router.get('/',questionController.getAll)

// get question by subject and student
router.get('/:subject/:student',questionController.getBySubjectAndStudent)

// update question
router.put('/quiz/update/:qid',questionController.update)

// delete question
router.delete('/quiz/delete/:qid',questionController.delete)


module.exports = router;