import React from "react";

const StudentExamTable = ({ subjectListByGrade, navigate, user }) => {
  return (
    <React.Fragment>
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
                      onClick={() => navigate(`/question/student/${val.subid}`)}
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
    </React.Fragment>
  );
};

export default StudentExamTable;
