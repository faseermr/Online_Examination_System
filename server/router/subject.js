const express = require('express');
const router = express.Router();
const {getSubjectList,updateSubjectStatus, getSubjectByGradeAndStudent, create,update,deleteSubject} = require('../controller/subject');

router.get('/',getSubjectList)

router.get('/grade/:grade/:student',getSubjectByGradeAndStudent)

router.put('/update/:sub_status/:subid',updateSubjectStatus)

router.post('/',create)

router.put('/update/:subid',update)

router.delete('/:subid',deleteSubject)

module.exports = router;