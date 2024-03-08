import React, {useEffect} from 'react'
import NavBar from './NavBar'
import { useNavigate } from "react-router-dom";


function About(props) {
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
    <NavBar userName={props.userName}/>
    <div className='d-flex justify-content-center align-item-center' style={{marginTop: '8rem'}}>
    <div>
      <p>
      <h1>About LPG Distributor Management System</h1>
      </p>
      <p>
        Streamlining LPG distribution operations for efficient gas and cylinder
        management.
      </p>
      <div style={{marginTop: '4rem'}}>
      <p>
      <h2>Key Features:</h2>
      <l>
        <li>Inventory Management</li>
        <li>Automated Processes</li>
        <li>User-friendly Interface</li>
        <li>Comprehensive Reporting</li>
      </l>
      </p>
      </div>
      <div style={{marginTop: '3rem'}}>
      <h2>How It Works:</h2>
      <p>
        Centralized platform for simplified purchase, distribution, and sales
        tracking. Enhancing productivity with minimal errors.
      </p>
      </div>
    </div>
    </div>
    </>
  )
}

export default About;