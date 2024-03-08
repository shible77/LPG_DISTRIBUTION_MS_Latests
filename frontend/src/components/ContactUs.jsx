import React, {useEffect} from 'react'
import NavBar from './NavBar'
import { useNavigate } from "react-router-dom";


function ContactUs(props) {
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
    <p>
      <h4>
        For inquiries, contact{" "}
        <a href="mailto:lpg.dist.support@gmail.com">lpg.dist.support@gmail.com</a>.
      </h4>
    </p>
    </div>
  </>
  )
}

export default ContactUs