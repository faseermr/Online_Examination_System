const dbConn = require("../config/db_config");

module.exports = {
  getAllGrade: (result) => {
    dbConn.query(`Select * From class`, (err, res) => {
      if (err) {
        result(err, res);
      } else {
        result(null, res);
      }
    });
  },

  create: (grade, result) => {
    //console.log(grade);
    dbConn.query(
      `Insert into class (grade) values (?)`,
      [grade],
      (err, res) => {
        if (err) {
          //   console.log(err);
          result(err, res);
        } else {
          console.log(res);
          result(null, res);
        }
      }
    );
  },

  deleteGrade: (grade, result) => {
    dbConn.query(`Delete from class where clsid =?`, grade, (err, res) => {
      if (err) {
        // console.log(err);
        result(err, res);
      } else {
        result(null, res);
      }
    });
  },

  updateGrade: (id, grade, result) => {
    dbConn.query(
      `Update class set grade = ? where clsid=?`,
      [grade, id],
      (err, res) => {
        // console.log(res);
        if (err) {
          //   console.log(err);
          result(err, res);
        } else {
          result(null, res);
        }
      }
    );
  },
};
