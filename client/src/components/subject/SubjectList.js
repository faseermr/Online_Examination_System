import React, { Component } from "react";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";

class SubjectList extends Component {
  render() {
    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th className="id">ID</th>
              <th>Subject</th>
              <th>Grade</th>
              <th className="action">Action</th>
            </tr>
          </thead>

          <tbody>
            {this.props.subjectList.map((val, idx) => {
              return (
                <tr key={idx}>
                  <td>{val.subid}</td>
                  <td>{val.name}</td>
                  <td>{val.grade}</td>
                  <td>
                    <button onClick={() => this.props.handleUpdate(val)}>
                      <RiEdit2Line />
                    </button>
                    <button onClick={() => this.props.deleteSubject(val.subid)}>
                      <RiDeleteBinLine />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default SubjectList;
