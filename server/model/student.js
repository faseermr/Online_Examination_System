const dbConn = require("../config/db_config");

module.exports = {
  studentLogin: (email, password, result) => {
    console.log(email, password);
    dbConn.query(
      `Select * from student inner join class on class.clsid = student.clsid where student.email = ? And student.password = ?`,
      [email, password],
      (err, res) => {
        if (err) {
          // console.log(err)
          result(err, res);
        } else {
          //  console.log(res)
          result(null, res);
        }
      }
    );
  },

  studentSignup: (sname, email, password, clsid, result) => {
    dbConn.query(
      `Insert into student (name,email,password,clsid) values (?,?,?,?)`,
      [sname, email, password, clsid],
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
