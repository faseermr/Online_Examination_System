import React, { useState, useEffect, useContext } from "react";
import subjectServices from "../../service/subjectServices";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ExamTable = () => {
  const navigate = useNavigate();

  const { user, admin } = useContext(UserContext);
  const [subjectList, setSubjectList] = useState([]);
  const [subjectListByGrade, setSubjectListByGrade] = useState([]);

  const getAllSubject = async () => {
    const res = await subjectServices.getAllSubject();
    console.log(res.data);
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
        <table>
          <thead>
            <tr>
              <th className="col-1" scope="col">
                #
              </th>
              <th scope="col">Subject</th>
              <th scope="col">Grade</th>
              <th scope="col">View</th>
              <th scope="col">Status</th>
              <th className="col-2" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {subjectList.map((val) => {
              return (
                <tr key={val.subid}>
                  <td>{val.subid}</td>
                  <td>{val.name}</td>
                  <td>{val.grade}</td>
                  <td>
                    <a
                      onClick={() => navigate(`/question/subject/${val.subid}`)}
                      className="text-primary"
                      style={{ textDecoration: "none", cursor: "pointer" }}
                    >
                      {" "}
                      Click
                    </a>
                  </td>
                  <td>{val.status == 0 ? "Deactive" : "Active"} </td>
                  <td>
                    {val.status == 0 ? (
                      <button
                        className="btn btn-success"
                        onClick={() => updateSubjectStatus(1, val.subid)}
                      >
                        Active
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        onClick={() => updateSubjectStatus(0, val.subid)}
                      >
                        Deactive
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Subject</th>
              <th scope="col">Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subjectListByGrade.map((val) => {
              return (
                <tr key={val.subid}>
                  <td>{val.subid}</td>
                  <td>{val.name}</td>
                  <td>{val.grade}</td>
                  <td>
                    {val.submit_id > 0 ? (
                      <a
                        onClick={() =>
                          navigate(`/question/review/${user[0].stuid}`)
                        }
                        className="text-primary"
                        style={{ textDecoration: "none", cursor: "pointer" }}
                      >
                        {" "}
                        Review{" "}
                      </a>
                    ) : (
                      <a
                        onClick={() =>
                          navigate(`/question/student/${val.subid}`)
                        }
                        className="text-primary"
                        style={{ textDecoration: "none", cursor: "pointer" }}
                      >
                        {" "}
                        Click{" "}
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExamTable;
