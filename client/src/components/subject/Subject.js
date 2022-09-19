import React, { Component } from "react";
import classServices from "../../service/classServices";
import subjectServices from "../../service/subjectServices";

import {
  addSubjectAction,
  getAllSubjectAction,
  updateSubjectAction,
  deleteSubjectAction,
} from "../../redux/action/subjectAction";
import { getAllClassAction } from "../../redux/action/classAction";
import { connect } from "react-redux";
import SubjectList from "./SubjectList";

class Subject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: [],
      editData: [],
      subjectList: [],
      grade: "",
      subject: "",
      isEdit: false,
    };
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(data) {
    data.preventDefault();
    let grade = this.state.grade;
    let subject = this.state.subject;
    if (this.state.isEdit) {
      this.props
        .updateSubject(this.state.editData.subid, {
          subject: subject,
          clsid: grade,
        })
        .then((res) => {
          if (res.message) {
            alert(res.message);
            this.props.getAllSubject();
            this.setState({
              subject: "",
              grade: "",
              isEdit: false,
            });
          }
        });
    } else {
      this.props
        .addSubject({
          subject: subject,
          clsid: grade,
        })
        .then((res) => {
          //console.log(res.subject.error);
          if (res.message) {
            alert(res.message);
            this.props.getAllSubject();
            this.setState({
              grade: "",
              subject: "",
            });
          }
        });
    }
  }

  handleUpdate = (data) => {
    this.setState({
      editData: data,
      subject: data.name,
      grade: data.clsid,
      isEdit: true,
    });
  };

  handleDelete = async (id) => {
    let option = window.confirm("Are you want to delete");
    if (option) {
      const response = await subjectServices.deleteSubject(id);
      console.log(response.data);
      if (response.data.message) {
        alert(response.data.message);
        // this.getAllSubject();
      }
    }
  };

  componentDidMount() {
    this.props.getAllClass();

    this.props.getAllSubject();
  }

  render() {
    //console.log(this.props.state);
    let { subjectList } = this.props.state.subjectData;
    let { classList } = this.props.state.classData;
    return (
      <React.Fragment>
        <div className="container">
          <div className="card p-4 m-4">
            <form autoComplete="off" onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group mt-2">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex: Maths"
                  onChange={this.handleChange.bind(this)}
                  name="subject"
                  value={this.state.subject}
                />
              </div>

              <div className="form-group mt-4">
                <label>Grade:</label>
                <select
                  className="form-select"
                  name="grade"
                  value={this.state.grade}
                  onChange={this.handleChange.bind(this)}
                >
                  <option selected disabled>
                    -- Select One --
                  </option>
                  {classList &&
                    classList.map((val, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          <option value={val.clsid}>{val.grade}</option>
                        </React.Fragment>
                      );
                    })}
                </select>
              </div>

              <button type="submit" className="btn btn-primary mt-4">
                {this.state.isEdit ? "Update" : "Submit"}
              </button>
            </form>
          </div>
          <div>
            <SubjectList
              subjectList={subjectList}
              handleUpdate={this.handleUpdate}
              deleteSubject={this.props.deleteSubject}
            />
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
    getAllSubject: () => dispatch(getAllSubjectAction()),
    addSubject: (data) => dispatch(addSubjectAction(data)),
    updateSubject: (id, data) => dispatch(updateSubjectAction(id, data)),
    deleteSubject: (id) => dispatch(deleteSubjectAction(id)),
    getAllClass: () => dispatch(getAllClassAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subject);
