import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Home(props) {
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve authentication status from localStorage
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/addCookie")
      .then((res) => {
        if (res.data.Status === "Success") {
          props.setName(res.data.Name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div>
      <NavBar userName={props.userName} setName={props.setName} />
      <SideBar userName={props.userName} />
    </div>
  );
}

export default Home;
