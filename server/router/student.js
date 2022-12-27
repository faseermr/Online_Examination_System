const express = require("express");
const router = express.Router();
const { studentLogin, studentSignup } = require("../controller/student");

router.post("/signup", studentSignup);

router.post("/", studentLogin);

module.exports = router;
