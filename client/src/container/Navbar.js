import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAdminDataAction,
//   getUserDataAction,
//   notLoginUserAction,
// } from "../redux/action/authAction";

const Navbar = () => {
  const { userName } = useContext(UserContext);
  // const userData = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // const [user, setUser] = useState([]);
  // const [admin, setAdmin] = useState([]);
  const userToken = JSON.parse(localStorage.getItem("student"));
  const adminToken = JSON.parse(localStorage.getItem("admin"));

  // useEffect(() => {
  //   dispatch(getAdminDataAction());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getUserDataAction());
  //   dispatch(getAdminDataAction());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (userData.userdata) {
  //     setUser(userData.userdata.student);
  //   }

  //   if (userData.adminData) {
  //     setAdmin(userData.adminData.admin);
  //   }
  // }, [userData]);

  const logOut = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("admin");
    setTimeout(() => {
      window.location.reload();
    }, 50);
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link
              to="/dashboard"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "25px",
              }}
            >
              Online Exam System
            </Link>
            <li className="nav-item nav-link text-success">
              {userToken ? userName : null}
              {adminToken ? "Admin" : null}
              {/* {user.map((val) => val.name)}
              {admin.map((val) => val.name)} */}
            </li>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!userToken && !adminToken ? (
                <>
                  <li className="nav-item nav-link">
                    <Link to="/admin" style={{ textDecoration: "none" }}>
                      Admin
                    </Link>
                  </li>
                  <li className="nav-item nav-link">
                    <Link to="/signin" style={{ textDecoration: "none" }}>
                      Signin
                    </Link>
                  </li>
                  <li className="nav-item nav-link">
                    <Link to="/signup" style={{ textDecoration: "none" }}>
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {adminToken ? (
                    <React.Fragment>
                      <li className="nav-item nav-link">
                        <Link
                          to="/post_question"
                          style={{ textDecoration: "none" }}
                        >
                          Question
                        </Link>
                      </li>

                      <li className="nav-item nav-link">
                        <Link
                          to="/classroom"
                          style={{ textDecoration: "none" }}
                        >
                          Classroom
                        </Link>
                      </li>

                      <li className="nav-item nav-link">
                        <Link to="/subject" style={{ textDecoration: "none" }}>
                          Subject
                        </Link>
                      </li>
                    </React.Fragment>
                  ) : null}
                  {/* <li className="nav-item nav-link">
              <Link to="/question">Question</Link>  
              </li> */}
                  <li className="nav-item nav-link">
                    <Link to="/examtable" style={{ textDecoration: "none" }}>
                      Exam Table
                    </Link>
                  </li>
                  <li className="nav-item nav-link">
                    <Link
                      to="/signin"
                      style={{ textDecoration: "none" }}
                      onClick={logOut}
                    >
                      Signout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
