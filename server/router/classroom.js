const express = require('express');
const router = express.Router();
const { getAllGrade, create, deleteGrade, updateGrade } = require('../controller/classroom');

router.post('/',create);

router.get('/',getAllGrade);

router.delete('/:grade',deleteGrade)

router.put('/update/:id',updateGrade)


module.exports = router;