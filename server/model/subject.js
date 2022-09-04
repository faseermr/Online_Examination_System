const dbConn = require("../config/db_config");

module.exports = {
    getSubjectList : (result) => {
        dbConn.query(`SELECT * FROM subject INNER JOIN class on class.clsid = subject.clsid`,
        (err,res) => {
            if(err){
                result(err,res)
            }else{
                result(null, res)
            }  
        })
    },

    getSubjectByGradeAndStudent : (grade,student,result) => {
        dbConn.query(`SELECT * FROM 
        (SELECT subject.subid,subject.name,subject.clsid,class.grade,subject.status FROM subject 
        INNER JOIN class on class.clsid = subject.clsid 
        WHERE subject.clsid=? and subject.status = 1) as A 
        LEFT JOIN (SELECT subject_student.id as submit_id,subject_student.stuid as student,subject_student.subid
        as subject FROM subject_student where stuid = ?)As B on B.subject = A.subid `,
        [grade,student],(err,res) => {
            console.log(res);
            if(err){
                result(err,res)
            }else{
                result(null, res)
            }  
        })
    },

    updateSubjectStatus : (sub_status,subid,result) => {
        dbConn.query(`Update subject set status =? where subid=?`,[sub_status,subid],(err,res)=> {
            if(err){
                result(err,res)
            }else{
                result(null, res)
            }  
        })
    },

    create : (data,result) => {
        dbConn.query(`Insert into subject (name,clsid) values (?,?)`,[data.subject,data.clsid],(err,res) => {
            if(err){
                result(err,res)
            }else{
                result(null, res)
            }    
        })
    },

    update : (id,data,result) => {
        dbConn.query(`Update subject set name =?, clsid =? where subid=?`,
        [data.subject,data.clsid,id], (err,res) => {
            if(err){
                result(err,res)
            }else{
                result(null, res)
            }   
        })
    },

    deleteSubject : (id,result) => {
        dbConn.query(`Delete from subject where subid =  ?`,id,(err,res) => {
            if(err){
                result(err,res)
            }else{
                result(null, res)
            }   
        })
    }
}