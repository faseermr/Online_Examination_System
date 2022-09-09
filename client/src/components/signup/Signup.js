import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classServices from "../../service/classServices";
import studentServices from "../../service/studentServices";
import "./style.css";

const Signup = () => {
  const initialState = {
    sname: "",
    grade: "",
    email: "",
    password: "",
  };

  const [student, setStudent] = useState(initialState);
  const [classlist, setClasslist] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    studentServices
      .studentSignup({
        sname: student.sname,
        grade: student.grade,
        email: student.email,
        password: student.password,
      })
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
        }
      });
  };

  const getAllClass = async () => {
    const res = await classServices.getAllClass();
    console.log(res.data);
    if (res.data.data.length > 0) {
      setClasslist(res.data.data);
    }
  };

  useEffect(() => {
    getAllClass();
  }, []);

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <h3 className="head">Sign Up</h3>
        <div className="mb-3">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Full name"
            name="sname"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Grade</label>
          <select
            className="form-select"
            name="grade"
            onChange={handleChange}
            required
          >
            <option selected>-- Select One --</option>
            {classlist.map((val, idx) => {
              return (
                <option key={idx} value={val.clsid}>
                  {val.grade}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <Link to="/signin">Signin</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
