const answer = require('../model/answer')
const {postAnswer,checkAnswer,getAnswerByStudent,updateAnswer,submitAnswer} = require('../model/answer')

module.exports = {
    postAnswer: (req,res) => {
        const body = req.body
        //console.log("body",body)
        postAnswer(body,(err,answer) => {
            if(err)
            res.send(err);

            res.json({error:false,message:"Answer added successfully!",data:answer})
        })
    },
    checkAnswer: (req,res) => {
        checkAnswer(req.params.student,(err,answer) => {
            if(err)
            res.send(err)

            res.json(answer)
        })
    },
    getAnswerByStudent: (req,res) => {
        getAnswerByStudent(req.params.student,(err,answer) => {
            if(err)
            res.send(err)

            res.json(answer)
        })
    },
    updateAnswer : (req,res) => {
       console.log("req",req.body);
       res.send("welcome")
    },

    submitAnswer:(req,res) => {
        const body = req.body;
        submitAnswer(body,(err,submit) => {
            if(err)
            res.send(err);

            res.json({error:false,message:"Successfully submitted!",data:submit})
        })
    }

}