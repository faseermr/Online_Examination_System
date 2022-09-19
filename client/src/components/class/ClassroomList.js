import React, { Component } from "react";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";

class ClassroomList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // let { classList } = this.props.classList;
    // console.log(this.props.classList);
    return (
      <React.Fragment>
        {" "}
        <table>
          <thead>
            <tr>
              <th className="id">ID</th>
              <th>Grade</th>
              <th className="action">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.classList &&
              this.props.classList.map((val, idx) => {
                return (
                  <tr key={idx}>
                    <td>{val.clsid}</td>
                    <td>{val.grade}</td>
                    <td>
                      <button
                        onClick={(e) =>
                          this.props.handleUpdate.bind(this)(e, val)
                        }
                      >
                        <RiEdit2Line />
                      </button>
                      <button onClick={() => this.props.deleteClass(val.clsid)}>
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

export default ClassroomList;
