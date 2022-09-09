import React from "react";

const AdminExamTable = ({ subjectList, navigate, updateSubjectStatus }) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default AdminExamTable;
