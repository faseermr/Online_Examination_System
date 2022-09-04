import React, { Component } from "react";
import classServices from "../../service/classServices";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import {
  addClassAction,
  getAllClassAction,
  updateClassAction,
  deleteClassAction,
} from "../../redux/action/classAction";
import { connect } from "react-redux";

class Classroom extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      classList: [],
      editData: [],
      grade: "",
      clsid: "",
      isEdit: false,
      gradeError: "",
    };
  }

  sayHello() {
    alert("Hello!");
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  getAllClass() {
    classServices.getAllClass().then((res) => {
      //console.log(res.data);
      this.setState({
        classList: res.data.data,
      });
    });
  }

  // handleChange = (e) => {
  //   const {name,value} = e.target;
  //   this.setState({
  //    [name]:value
  //   })
  // }

  handleUpdate(e, data) {
    console.log(data);
    this.setState({
      editData: data,
      grade: data.grade,
      clsid: data.clsid,
      isEdit: true,
    });
  }

  handleDelete(e, grade) {
    let option = window.confirm("Are you want to delete");
    if (option) {
      this.props.deleteClass(grade).then((res) => {
        alert(res.message);
        //  this.props.getAllClass()
        // return this
      });
    }
  }

  validate() {
    let gradeError = "";

    if (!this.state.grade) {
      gradeError = "required";
    }

    if (gradeError) {
      this.setState({ gradeError });
      return false;
    }
    return true;
  }

  handleSubmit(data) {
    data.preventDefault();
    if (this.validate()) {
      let grade = this.state.grade;
      if (this.state.isEdit) {
        this.props
          .updateClass(this.state.editData.clsid, {
            grade: grade,
          })
          .then((res) => {
            // console.log(res.data.err);
            if (res.data.error) {
              alert(res.data.error);
            } else {
              alert(res.message);
              this.props.getAllClass();
              this.setState({
                grade: "",
                isEdit: false,
              });
            }
          });
      } else {
        this.props
          .addClass({
            grade: grade,
          })
          .then((res) => {
            //  console.log(res.data);
            if (res.data.error) {
              alert(res.data.error);
            } else {
              alert(res.message);
              this.props.getAllClass();
              this.setState({
                grade: "",
              });
            }
          });
      }
    }
  }

  componentDidMount() {
    // this.getAllClass()
    this.props.getAllClass();
    //this.props.getAllClassAction()
  }

  render() {
    // console.log(this.props.state.classData.classList);
    let { classList } = this.props.state.classData;
    //  console.log(classList);
    let gradeError = this.state.gradeError;
    return (
      <React.Fragment>
        <div className="container">
          <div className="card m-4 p-4">
            <form onSubmit={this.handleSubmit} autoComplete="off">
              <div className="form-group mt-2">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Grade 11"
                  onChange={this.handleChange.bind(this)}
                  name="grade"
                  value={this.state.grade}
                />
                <div className="text-danger">{gradeError}</div>
              </div>

              <button type="submit" className="btn btn-primary mt-4">
                {this.state.isEdit ? "Update" : "Submit"}
              </button>
            </form>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th className="id">ID</th>
                  <th>Grade</th>
                  <th className="action">Action</th>
                </tr>
              </thead>
              <tbody>
                {classList &&
                  classList.map((val, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{val.clsid}</td>
                        <td>{val.grade}</td>
                        <td>
                          <button
                            onClick={(e) =>
                              this.handleUpdate.bind(this)(e, val)
                            }
                          >
                            <RiEdit2Line />
                          </button>
                          <button
                            onClick={() => this.props.deleteClass(val.clsid)}
                          >
                            <RiDeleteBinLine />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { state };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllClass: () => dispatch(getAllClassAction()),
    addClass: (data) => dispatch(addClassAction(data)),
    updateClass: (id, data) => dispatch(updateClassAction(id, data)),
    deleteClass: (id) => dispatch(deleteClassAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Classroom);
