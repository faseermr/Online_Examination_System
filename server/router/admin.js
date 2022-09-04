const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controller/admin')

router.post('/',adminLogin)

module.exports = router;