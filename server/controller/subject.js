const subject = require('../model/subject');
const { getSubjectList,getSubjectByGradeAndStudent ,updateSubjectStatus,create,update, deleteSubject
        } = require('../model/subject');

module.exports = {
    getSubjectList : (req,res) => {
        getSubjectList((err,subject) => {
            if(err)
            res.send(err)

            res.json(subject)
        })
    },

    getSubjectByGradeAndStudent : (req,res) => {
      // console.log(req.params);
        getSubjectByGradeAndStudent(req.params.grade,req.params.student,(err,subject) => {
            if(err)
            res.send(err)

            res.json(subject)
        })
    },

    updateSubjectStatus : (req,res) => {
        //console.log(req.params);
        const {sub_status,subid} = req.params
        updateSubjectStatus(sub_status,subid,(err,subject) => {
            if(err)
            res.send(err)

            res.json(subject)
        })
    },

    create : (req,res) => {
        //console.log(req.body);
        create(req.body,(err,subject) => {
            if(err)
            res.send(err)

            res.json({subject,message:"Successfully Added"})
        })
    },

    update : (req,res) => {
        const {subid} = req.params;
        const {subject, clsid } = req.body;
        update(subid,req.body,(err,subject) => {
            if(err)
            res.send(err)

            res.json({subject,message:"Successfully Updated"})
        })
    },

    deleteSubject : (req,res) => {
        deleteSubject(req.params.subid,(err,subject) => {
            if(err)
            res.send(err)

            res.json({message:"Successfully Deleted"})
        })
    }
}