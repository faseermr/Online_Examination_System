const Question = require('../model/question');



module.exports = {
    // to handle question adding
    create : (req,res) => {
        
        const question = new Question({
            subid : req.body.subject,
            qfield : req.body.qfield,
            ans1 : req.body.ans1,
            ans2 : req.body.ans2,
            ans3 : req.body.ans3,
            ans4 : req.body.ans4,
            correct_ans : req.body.correct_ans
    
        })
    
    Question.create(question,(err,quiz) => {
        if (err)
        res.send(err);
    
        res.json({error:false,message:"Question added successfully!",data:quiz});
    })    
    },
    // get all question
    getAll : (req,res) => {
        Question.getAll((err,quiz) => {
            if(err)
            res.send(err);
    
            res.json({error:false, data:quiz})
        })
    },
    // get question by subject and student
    getBySubjectAndStudent : (req,res) => {
        
        Question.getBySubjectAndStudent(req.params.subject,req.params.student,(err,quiz) => {
            if(err)
            res.send(err);
    
            res.json({error:false, data:quiz})
        })
    },

    // get question by subject
    getBySubject : (req,res) => {
       // console.log(req);
        Question.getBySubject(req.params.subject,(err,quiz) => {
            if(err)
            res.send(err);
    
            res.json({error:false, data:quiz})  
        })
    },

    // get question by id
    getQuestionById : (req,res) => {
        console.log(req.params);
        Question.getQuestionById(req.params.qid,(err,quiz) => {
            if(err)
            res.send(err);
    
            res.json({error:false, data:quiz})  
        })
    },

    update : (req,res) => { 
        const {qfield,ans1,ans2,ans3,ans4,correct_ans,subject} = req.body
        Question.update(req.params.qid,req.body,(err,quiz) => {
            if (err)
        res.send(err);
    
        res.json({error:false,message:"Question updated successfully!",data:quiz});
        })
    },

    delete : (req,res) => {
        Question.delete(req.params.qid,(err,quiz) => {
        if (err)
        res.send(err);
        
        res.json({ error:false, message: 'Question successfully deleted' });
        })
    }
    
   
}
