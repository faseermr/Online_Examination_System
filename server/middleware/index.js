//const { updateAnswer } = require("../controller/answer");
const { checkAnswerExist,updateAnswer } = require("../model/answer")

module.exports = {
    checkAnswerExist :  (req,res,next) => {
        //console.log(req.body);
        const {qid, stuid, ans } = (req.body);
        checkAnswerExist(qid, stuid, (err,resp) => {
            if(resp.length > 0 ){
                updateAnswer(ans,qid,stuid,resp[0].ansid,(err,answer)=>{
                    res.json(answer)
                })
              //  console.log("middle",resp[0].ansid)
                //res.redirect(`/answer/update/${resp[0].ansid}`)  
            }else{
                next();
            }
        })
    },

    checkFeildsAreEmpty : (req,res,next) => {
        const {qid, stuid, ans } = (req.body);
        if(stuid ===''){

        }else{
            next()
        }
    }
}