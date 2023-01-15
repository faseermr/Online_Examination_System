const jwt = require("jsonwebtoken");
const config = require("../config/auth_config");
//const student = require("../model/student");
const { studentLogin, studentSignup } = require("../model/student");

module.exports = {
  studentLogin: (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;
    studentLogin(email, password, (err, student) => {
      if (err) res.send(err);
      else {
        if (student.length < 1) {
          res.json({ error: "Student not found" });
        } else {
          const token = jwt.sign(
            { email: student.email, id: student.stuid },
            config.secret,
            {
              expiresIn: 86400, // 24 hours
            }
          );
          res.json({
            message: "Successfully Login",
            student,
            token,
          });
        }
      }
    });
  },

  studentSignup: (req, res) => {
    const { sname, email, password, grade } = req.body;
    studentSignup(sname, email, password, grade, (err, student) => {
      if (err) res.send(err);

      res.json({ message: "Successfully created", student });
    });
  },
};
