import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminDataAction,
  getUserDataAction,
  notLoginUserAction,
} from "../redux/action/authAction";

const Dashboard = () => {
  //const {user,userName} = useContext(UserContext)
  const userData = useSelector((state) => state.user);
  const res = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    dispatch(getAdminDataAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserDataAction());
    dispatch(getAdminDataAction());
  }, [dispatch]);

  useEffect(() => {
    if (userData.userdata) {
      setUser(userData.userdata.student);
    }

    if (userData.adminData) {
      setAdmin(userData.adminData.admin);
    }
    //    if(result.admin.admin){
    //     setAdmin(result.admin)
    //    }
    // console.log(userData);
  }, [userData]);

  return (
    <div
      className="card bg-warning w-50 mx-auto p-2"
      style={{ fontSize: "20px" }}
    >
      {user.map((val, idx) => {
        return (
          <React.Fragment key={idx}>
            <div className="d-flex justify-content-center align-items-center">
              <h1>Welcome {val.name}</h1>
            </div>
            <div>
              <div>
                <label>ID :</label>
                <span> {val.stuid}</span>
              </div>
              <div>
                <label>Name :</label>
                <span> {val.name}</span>
              </div>
              <div>
                <label>Email :</label>
                <span> {val.email}</span>
              </div>
              <div>
                <label>Grade :</label>
                <span> {val.clsid}</span>
              </div>
            </div>
          </React.Fragment>
        );
      })}
      {admin.map((val, idx) => {
        return (
          <React.Fragment key={idx}>
            <div className="d-flex justify-content-center align-items-center">
              <h1>Welcome {val.name}</h1>
            </div>
            <div>
              <div>
                <label>ID :</label>
                <span> {val.id}</span>
              </div>
              <div>
                <label>Name :</label>
                <span> {val.name}</span>
              </div>
              <div>
                <label>Email :</label>
                <span> {val.email}</span>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Dashboard;
