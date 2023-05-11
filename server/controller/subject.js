const subject = require("../model/subject");
const {
  getSubjectList,
  getSubjectByGradeAndStudent,
  updateSubjectStatus,
  create,
  update,
  deleteSubject,
} = require("../model/subject");

module.exports = {
  // get all subject list
  getSubjectList: (req, res) => {
    getSubjectList((err, subject) => {
      if (err) res.send(err);

      res.json(subject);
    });
  },

  getSubjectByGradeAndStudent: (req, res) => {
    // console.log(req.params);
    getSubjectByGradeAndStudent(
      req.params.grade,
      req.params.student,
      (err, subject) => {
        if (err) res.send(err);

        res.json(subject);
      }
    );
  },

  updateSubjectStatus: (req, res) => {
    //console.log(req.params);
    const { sub_status, subid } = req.params;
    updateSubjectStatus(sub_status, subid, (err, subject) => {
      if (err) res.send(err);

      res.json(subject);
    });
  },
  // add subject
  create: (req, res) => {
    //console.log("body", req.body);
    create(req.body, (err, subject) => {
      if (err) res.send(err);

      res.json({ subject, message: "Successfully Added" });
    });
  },
  // update subject detatils
  update: (req, res) => {
    const { subid } = req.params;
    const { subject, clsid } = req.body;
    console.log(req.body);
    update(subid, req.body, (err, subject) => {
      if (err) res.send(err);

      res.json({ subject, message: "Successfully Updated" });
    });
  },
  // delete subject details by id
  deleteSubject: (req, res) => {
    deleteSubject(req.params.subid, (err, subject) => {
      if (err) res.send(err);

      res.json({ message: "Successfully Deleted" });
    });
  },
};
