import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Contacts() {
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve authentication status from localStorage
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);
  return <div>Hello from contact</div>;
}

export default Contacts;
