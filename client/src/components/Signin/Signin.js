import React from "react";
import { Formik } from "formik";
import studentServices from "../../service/studentServices";
import { useNavigate } from "react-router-dom";
import "./style1.css";

const Signin = () => {
  const navigate = useNavigate();

  return (
    <div className="login">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "reqiured";
          }
          if (!values.password) {
            errors.password = "required";
          }
          return errors;
        }}
        onSubmit={(data) => {
          studentServices
            .studentLogin({
              email: data.email,
              password: data.password,
            })
            .then((res) => {
              console.log(res);
              if (res.data.error) {
                alert(res.data.error);
              } else {
                alert(res.data.message);
                console.log(res.data);
                localStorage.setItem("student", JSON.stringify(res.data));
                //dispatch(getUserData())
                navigate(`/dashboard`);
                window.location.reload();
              }
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="login-form">
            <h1 className="login-heading">Login</h1>
            <label className="login-label">Email</label>

            <input
              name="email"
              type="email"
              className="signin-input"
              onBlur={handleBlur}
              onChange={handleChange}
            />

            {touched.email && errors.email ? (
              <span className="error-msg">{errors.email}</span>
            ) : null}

            <label className="login-label">Password</label>

            <input
              name="password"
              type="password"
              className="signin-input"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.password && errors.password ? (
              <span className="error-msg">{errors.password}</span>
            ) : null}
            <button type="submit" className="signin-submit">
              Login
            </button>
            <a>Forgot Password?</a>
          </form>

          // <form onSubmit={handleSubmit}>
          //       <h3 className='head'>Sign In</h3>
          //       <div className="mb-3">
          //         <label>Email address</label>
          //         <input
          //           name='email'
          //           type="email"
          //           className="form-control"
          //           placeholder="Enter email"
          //           onChange={handleChange}
          //         />
          //       </div>
          //       <div className="mb-3">
          //         <label>Password</label>
          //         <input
          //           name='password'
          //           type="password"
          //           className="form-control"
          //           placeholder="Enter password"
          //           onChange={handleChange}
          //         />
          //       </div>
          //       <div className="d-grid">
          //         <button type="submit" className="btn btn-primary">
          //           Submit
          //         </button>
          //       </div>
          //       <p className="forgot-password text-right">
          //         Forgot <a href="#">password?</a>
          //       </p>
          // </form>
        )}
      </Formik>
    </div>
  );
};

export default Signin;
