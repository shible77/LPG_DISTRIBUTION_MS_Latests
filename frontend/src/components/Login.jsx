import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import Alert from "./Alert";

function Login(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    // console.log(data.email);
    // console.log(data.password);
    event.preventDefault(); // Prevent default form submission
    axios
      .post("http://localhost:3001/login", data)
      .then((res) => {
        if (res.data.Status === "Success") {
          localStorage.setItem("isAuthenticated", "true");
          navigate("/home");
        } else {
          console.log(res.data.Error);
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {alert && <Alert type="danger" message="Wrong email or password" />}
      <div className="page-container">
        <div className="wrapper bg-white" style={{ marginTop: "3.7rem" }}>
          <div className="h2 text-center">Log in</div>
          <form className="pt-3">
            <div className="form-group py-2">
              <div className="input-field">
                <span className="far fa-envelope p-2"></span>
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  required
                  autoComplete="off"
                  value={data.email}
                  onChange={(event) =>
                    setData({ ...data, email: event.target.value })
                  }
                  className="input"
                />
              </div>
            </div>
            <div className="form-group py-1 pb-2">
              <div className="input-field">
                <span className="fas fa-lock p-2"></span>
                <input
                  type={showPassword ? "email" : "password"}
                  placeholder="Enter your Password"
                  required
                  autoComplete="off"
                  value={data.password}
                  onChange={(event) =>
                    setData({ ...data, password: event.target.value })
                  }
                />
                <button
                  className="btn bg-white text-muted"
                  type="button" // Specify button type to prevent form submission
                  onClick={togglePassword}
                >
                  <span
                    className={showPassword ? "far fa-eye-slash" : "far fa-eye"}
                  ></span>
                </button>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <NavLink to="#" id="forgot">
                Forgot Password?
              </NavLink>
            </div>
            <button
              className="btn btn-block text-center my-3"
              type="submit"
              onClick={handleSubmit}
            >
              Log in
            </button>
            {/* <div className="text-center pt-3 text-muted">
              Not a member? <NavLink to="/register">Sign up</NavLink>
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
