const {getAllGrade,create,deleteGrade,updateGrade} = require('../model/classroom');

module.exports = {
    getAllGrade : (req,res) => {
        getAllGrade((err,grade) => {
            if(err)
            res.send(err);
    
            res.json({error:false, data:grade})
        })
    },

    create : (req,res) => {
        //console.log(req.body);
        const { grade } = req.body;
        create(grade,(err,classroom) => {
            if(err)
            res.send(err);
            console.log('classroom ',classroom);
            res.json({error:false,message:"Successfully Added" ,data:classroom})
        })
    },

    deleteGrade : (req,res) => {
        const {grade} = req.params
        deleteGrade(grade,(err,grade) => {
            if(err)
            res.send(err);
    
            res.json({error:false, message:"Successfully Deleted"}) 
        })
    },

    updateGrade : (req,res) => {
        const {grade} = req.body;
        const {id} = req.params;
        updateGrade(id,grade,(err,resp) => {
            if(err)
            res.send(err);
    
            res.json({error:false, message:"Successfully Updated", data:resp}) 
        })
    }
}
