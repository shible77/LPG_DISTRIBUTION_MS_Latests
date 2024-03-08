import React, {useEffect} from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve authentication status from localStorage
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <NavBar userName={props.userName} />
      <div
        className="d-flex justify-content-center align-item-center"
        style={{ marginTop: "5rem" }}
      >
        <p>{`Hi! ${props.userName}. This your profile `}</p>
      </div>
    </>
  );
}

export default Profile;
