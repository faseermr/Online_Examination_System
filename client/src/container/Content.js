import React from "react";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
  Redirect,
} from "react-router-dom";
import routes from "../routes";

const Content = ({ auth }) => {
  return (
    <React.Fragment>
      {auth && (
        <Routes>
          {/* <Route path="/" element={<Navbar />} /> */}
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  element={<route.element />}
                  // displayName={route.displayName}
                  // render={(props) => (
                  //   <div>
                  //     weeeeee
                  //     <route.element {...props} />
                  //   </div>
                  // )}
                />
              )
            );
          })}
          {/* <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/exam" element={<OnlineExam />} />
        <Route path="/question" element={<QuestionPaper />} /> */}
        </Routes>
      )}
    </React.Fragment>
  );
};

export default Content;
