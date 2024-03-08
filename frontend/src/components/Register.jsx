import React, { useState } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import './Register.css'

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    // console.log(data.name)
    // console.log(data.email)
    // console.log(data.password)
    e.preventDefault();
    Axios.post("http://localhost:3001/register", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
      <div className="page-container">
        <div className="wrapper bg-white">
          <div className="h2 text-center">Sign Up</div>
          <form className="pt-3">
            <div className="form-group py-2">
              <div className="input-field">
                <span className="far fa-user p-2"></span>
                <input
                  type="email"
                  placeholder="Enter Your Full Name"
                  required
                  autoComplete="off"
                  value={data.name}
                  onChange={(event) =>
                    setData({ ...data, name: event.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group py-1 pb-2">
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
                />
              </div>
            </div>
            <div className="form-group py-1 pb-2">
              <div className="input-field">
                <span className="fas fa-lock p-2"></span>
                <input
                  type={showPassword ? "email" : "password"}
                  placeholder="Enter Your Password"
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
            <button className="btn btn-block text-center my-3" type="submit" onClick={handleSubmit}>
              Register
            </button>
            <div className="text-center pt-3 text-muted">
              Already have an account? <NavLink to="/">Login here</NavLink>
            </div>
          </form>
        </div>
      </div>
  );
}

export default Register;
