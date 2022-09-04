const dbConn = require("../config/db_config");

// constructor
const Question = function (question) {
    this.subid  =       question.subid;
    this.qfield =       question.qfield;
    this.ans1   =       question.ans1;
    this.ans2   =       question.ans2;
    this.ans3   =       question.ans3;
    this.ans4   =       question.ans4;
    this.correct_ans =  question.correct_ans;
} 


// add question into table called qustion
Question.create = (newQuestion, result) => {
    console.log(newQuestion);
    dbConn.query(`Insert into question set ?`,newQuestion,(err,res) => {
        if(err){
            //console.log(err)
            result(err, res)
        }else{
            //console.log(res)
            result(null, res)
        }
    })
}

// get all question
Question.getAll = (result) => {
    dbConn.query(`Select * From question order by qid`,  (err,res) => {
        if(err){
            //console.log(err)
            result(err, res)
        }else{
           // console.log(res)
            result(null, res)
        }
    })
}

Question.getBySubjectAndStudent = (subject,student,result) => {
    dbConn.query(`SELECT * FROM (Select * From question where subid=? order by qid) as A LEFT JOIN
                 (SELECT qid as qu ,ansid,ans,stuid FROM answer WHERE stuid=?) As B on A.qid = B.qu`,[subject,student],(err,res) => {
        if(err){
            //console.log(err)
            result(err, res)
        }else{
           // console.log(res)
            result(null, res)
        }  
    })
}

Question.getBySubject = (subject,result) => {
    //console.log(subject);
    dbConn.query(`SELECT * FROM question where subid=?`,[subject],(err,res) => {
        if(err){
           // console.log("err:",err)
            result(err, res)
        }else{
         //  console.log("res:",res)
            result(null, res)
        }  
    })
}

Question.getQuestionById = (qid,result) => {
    dbConn.query(`Select * from question where qid = ?`,[qid],(err,res) => {
        if(err){
            //console.log(err)
            result(err, res)
        }else{
           // console.log(res)
            result(null, res)
        }  
    })
}

Question.update = (qid,quiz,result) => {
    dbConn.query(`update question set qfield=?,ans1=?,ans2=?,ans3=?,ans4=?,correct_ans=?,subid=? where qid=?`,
    [quiz.qfield,quiz.ans1,quiz.ans2,quiz.ans3,quiz.ans4,quiz.correct_ans,quiz.subject, qid],(err,res) => {
        if(err){
            console.log(err)
            result(err, res)
        }else{
           console.log(res)
            result(null, res)
        }     
    })
}

Question.delete = (qid,result) => {
    dbConn.query(`Delete from question where qid =?`,qid,(err,res) => {
        if(err) {
    
            result(null, err);
          }
          else{
            result(null, res);
          }
    })
}



module.exports = Question;