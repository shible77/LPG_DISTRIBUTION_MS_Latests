import React from "react";
import { NavLink } from "react-router-dom";
import cylinderImage from "./cylinder.jpg";
import axios from "axios";

function NavBar(props) {
  const handleDelete = () => {
    axios
      .get("http://localhost:3001/logout")
      .then((res) => {
        props.setName("");
        localStorage.removeItem("isAuthenticated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light ">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="#">
          <img
            src={cylinderImage}
            alt="Logo"
            width="25"
            height="30"
            className="d-inline-block align-text-center"
          />
          <strong style={{ fontFamily: " cursive", fontSize: "20px" }}>
            LPG Distributor
          </strong>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/home"
                style={{ fontFamily: " cursive", fontSize: "17.5px" }}
              >
                <i className="fa fa-fw fa-home"></i>Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/profile"
                style={{ fontFamily: " cursive", fontSize: "17.5px" }}
              >
                <i className="fa fa-fw fa-user-circle-o"></i>
                {props.userName}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/About"
                style={{ fontFamily: " cursive", fontSize: "17.5px" }}
              >
                <i className="fa fa-fw fa-address-book"></i>About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/contactUs"
                tabIndex="-1"
                aria-disabled="true"
                style={{ fontFamily: " cursive", fontSize: "17.5px" }}
              >
                <i className="fa fa-fw fa-phone"></i>Contact Us
              </NavLink>
            </li>
          </ul>
          <form className="d-flex">
            <NavLink className="nav-link" to="/">
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={handleDelete}
              >
                Logout
              </button>
            </NavLink>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
