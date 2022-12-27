const dbConn = require("../config/db_config");

module.exports = {
  postAnswer: (data, result) => {
    dbConn.query(
      `Insert into answer(qid,ans,stuid) Values (?,?,?)`,
      [data.qid, data.ans, data.stuid],
      (err, res) => {
        if (err) {
          console.log(err);
          result(err, res);
        } else {
          console.log(res);
          result(null, res);
        }
      }
    );
  },

  checkAnswer: (student, result) => {
    dbConn.query(
      `SELECT * FROM answer RIGHT JOIN question ON question.qid = answer.qid AND answer.stuid=?`,
      [student],
      (err, res) => {
        if (err) {
          //  console.log(err);
          result(err, res);
        } else {
          //  console.log(res);
          result(null, res);
        }
      }
    );
  },
  // checkAnswer : (student,result) => {
  //     dbConn.query(`SELECT * FROM answer INNER JOIN question ON question.qid = answer.qid where answer.stuid=?`,
  //                     [student],(err,res) => {
  //                         if(err){
  //                             console.log(err)
  //                             result(err, res)
  //                         }else{
  //                             console.log(res)
  //                             result(null, res)
  //                         }
  //                     })
  // },

  getAnswerByStudent: (student, result) => {
    console.log(student);
    dbConn.query(
      `SELECT * FROM question INNER JOIN answer on question.qid = answer.qid
                      WHERE answer.stuid = ?`,
      [student],
      (err, res) => {
        if (err) {
          console.log(err);
          result(err, res);
        } else {
          console.log(res);
          result(null, res);
        }
      }
    );
  },

  checkAnswerExist: (qid, student, result) => {
    dbConn.query(
      `Select * From answer where qid =? And stuid=?`,
      [qid, student],
      (err, res) => {
        if (err) {
          //console.log(err)
          result(err, res);
        } else {
          //console.log(res)
          result(null, res);
        }
      }
    );
  },

  updateAnswer: (ans, qid, student, answerid, result) => {
    dbConn.query(
      `Update answer set ans=? where qid=? And stuid=? And ansid=?`,
      [ans, qid, student, answerid],
      (err, res) => {
        if (err) {
          console.log(err);
          result(err, res);
        } else {
          console.log(res);
          result(null, res);
        }
      }
    );
  },

  submitAnswer: (data, result) => {
    console.log("data", data);
    dbConn.query(
      `Insert into subject_student(stuid,subid) Values(?,?)`,
      [data.student, data.subject],
      (err, res) => {
        if (err) {
          console.log(err);
          result(err, res);
        } else {
          console.log(res);
          result(null, res);
        }
      }
    );
  },
};
