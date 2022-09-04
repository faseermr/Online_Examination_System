const dbConn = require("../config/db_config");

module.exports = {
    adminLogin : (email,password,result) => {
        console.log(email,password)
        dbConn.query(`Select * from admin where email = ? And password = ?`,[email,password],(err,res) => {
            if(err){
               // console.log(err)
                result(err, res)
            }else{
              //  console.log(res)
                result(null, res)
            }
        })
    }
}