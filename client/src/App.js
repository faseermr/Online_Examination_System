import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./container/Navbar";
import Layout from "./container/Layout";
import UserContextProvider from "./context/userContext";
import Signin from "./components/Signin/Signin";
import Signup from "./components/signup/Signup";
import AdminLogin from "./components/Signin/Adminlogin";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import ProtectedRoute from "./container/ProtectedRoute";

const App = () => {
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  // const {userName} = useContext(UserContext);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("student"));
    if (userData) {
      setUser(true);
    }

    const adminData = JSON.parse(localStorage.getItem("admin"));
    if (adminData) {
      setAdmin(true);
    }
  }, []);

  return (
    <React.Fragment>
      <UserContextProvider>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Navbar />
            </div>
            <Routes>
              <Route path="/signin" exact element={<Signin />} />
              <Route path="/signup" exact element={<Signup />} />
              <Route path="/admin" exact element={<AdminLogin />} />
            </Routes>
            <Layout auth={user || admin} />
            {/* {admin || user ? <Layout /> : "No"} */}
          </BrowserRouter>
        </Provider>
      </UserContextProvider>
    </React.Fragment>
  );
};

export default App;

// *******************************************************************************
// export const Get_User_Data = "Get_User_Data";
// export const Get_Admin_Data = "Get_Admin_Data";
// export const Not_Login = "Not_Login";

// action
// export const getUserDataAction = () => ({type:Get_User_Data})
// export const getAdminDataAction = () => ({type:Get_Admin_Data})
// export const notLoginUserAction = () => ({type:Not_Login})
// reducer
// const getUserDataReducer = (state,action) => {
//   switch(action.type){
//     case Get_User_Data:
//       return state =JSON.parse(localStorage.getItem("student"));

//     case Not_Login:
//       return state ="two"

//     default:
//       return state="aaa"

//   }
// }

// const getAdminDataReducer = (state,action) => {
//   switch(action.type){
//     case Get_Admin_Data:
//       return state =JSON.parse(localStorage.getItem('admin'));

//     case Not_Login:
//       return state ="not"

//     default:
//       return state ="aaa"

//   }
// }

// const rootReducer = combineReducers({
//   student:getUserDataReducer,
//   admin:getAdminDataReducer

// })

// const store = createStore(rootReducer,applyMiddleware(thunk))

// ********************************************************************************************
