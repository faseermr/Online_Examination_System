const jwt = require("jsonwebtoken");
const config = require("../config/auth_config");
const {adminLogin} = require('../model/admin');

module.exports = {
    adminLogin : (req,res) =>{
        const { email, password } = req.body;
        adminLogin(email,password,(err,admin) => {
            if(err)
            res.send(err);
            else{
                if(admin.length < 1){
                    res.json({error:"Admin not found"})
                }else{
                    const token = jwt.sign({ email: admin.email ,id:admin.stuid}, config.secret, {
                        expiresIn: 86400 // 24 hours
                        });
                    res.json({message:"Successfully Login",
                            admin:admin,
                            token})
                }
            }  
        })
    }
}