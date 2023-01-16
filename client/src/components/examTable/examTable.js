import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import subjectServices from "../../service/subjectServices";
import AdminExamTable from "./AdminExamTable";
import StudentExamTable from "./StudentExamTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminDataAction,
  getUserDataAction,
} from "../../redux/action/authAction";

const ExamTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [subjectList, setSubjectList] = useState([]);
  const [subjectListByGrade, setSubjectListByGrade] = useState([]);
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState([]);

  const getAllSubject = async () => {
    const res = await subjectServices.getAllSubject();
    setSubjectList(res.data);
  };

  const getSubjectByGrade = async () => {
    const res = await subjectServices.getSubjectByGrade(
      user[0].clsid,
      user[0].stuid
    );
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

  useEffect(() => {
    dispatch(getUserDataAction());
    dispatch(getAdminDataAction());
  }, [dispatch]);

  useEffect(() => {
    if (userData.userdata) {
      console.log(userData.userdata.student);
      setUser(userData.userdata.student);
    }

    if (userData.adminData) {
      setAdmin(userData.adminData.admin);
    }
  }, [userData]);

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
