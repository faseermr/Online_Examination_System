import React, { useState, useEffect, useContext } from "react";
import subjectServices from "../../service/subjectServices";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import AdminExamTable from "./AdminExamTable";
import StudentExamTable from "./StudentExamTable";

const ExamTable = () => {
  const navigate = useNavigate();

  const { user, admin } = useContext(UserContext);
  const [subjectList, setSubjectList] = useState([]);
  const [subjectListByGrade, setSubjectListByGrade] = useState([]);

  const getAllSubject = async () => {
    const res = await subjectServices.getAllSubject();
    //console.log(res.data);
    setSubjectList(res.data);
  };

  const getSubjectByGrade = async () => {
    const res = await subjectServices.getSubjectByGrade(
      user[0].clsid,
      user[0].stuid
    );
    //console.log(res.data)
    setSubjectListByGrade(res.data);
  };

  const updateSubjectStatus = (sub_status, subid) => {
    subjectServices.updateSubjectStatus(sub_status, subid).then((res) => {
      getAllSubject();
    });
  };

  useEffect(() => {
    getAllSubject();
  }, []);

  useEffect(() => {
    getSubjectByGrade();
  }, [user]);

  return (
    <div className="container">
      {admin.length > 0 ? (
        <AdminExamTable
          subjectList={subjectList}
          navigate={navigate}
          updateSubjectStatus={updateSubjectStatus}
        />
      ) : (
        <StudentExamTable
          subjectListByGrade={subjectListByGrade}
          navigate={navigate}
          user={user}
        />
      )}
    </div>
  );
};

export default ExamTable;
