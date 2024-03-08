import React, { useState, useEffect } from "react";
import "./AddEmployee.css";
import axios from "axios";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";


function AddContacts() {
  const navigate = useNavigate();
  useEffect(() => {
    // Retrieve authentication status from localStorage
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);
  const [data, setData] = useState({
    name: "",
    company_name: "",
    email: "",
    mobile: "",
    full_address: "",
    district: "",
    contactType: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleContactTypeChange = (e) => {
    setData({
      ...data,
      contactType: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/addContacts", data)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Successfully Inserted Data");
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 5000);
        } else {
          console.log(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="container">
        <h3>ENTER THE FOLLOWING INFORMATION TO ADD A NEW CONTACTS</h3>
        <form>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      name: e.target.value,
                    })
                  }
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="companyName" className="form-label">
                  Company/Shop Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="companyName"
                  name="company_name"
                  value={data.company_name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      company_name: e.target.value,
                    })
                  }
                  required
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="row">
          <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={(e) =>
                    setData({
                      ...data,
                      email: e.target.value,
                    })
                  }
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile Number:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  value={data.mobile}
                  onChange={(e) =>
                    setData({
                      ...data,
                      mobile: e.target.value,
                    })
                  }
                  required
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="fullAddress" className="form-label">
                  Full Address:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullAddress"
                  name="full_address"
                  value={data.full_address}
                  onChange={(e) =>
                    setData({
                      ...data,
                      full_address: e.target.value,
                    })
                  }
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="district" className="form-label">
                  District:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="district"
                  name="district"
                  value={data.district}
                  onChange={(e) =>
                    setData({
                      ...data,
                      district: e.target.value,
                    })
                  }
                  required
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
          <div className="row">
            
              
                <label htmlFor="contactType" className="form-label">
                  Select Contact Type:
                </label>
                <select
                  className="form-select"
                  id="contactType"
                  name="contactType"
                  value={data.contactType}
                  onChange={handleContactTypeChange}
                >
                  <option value="supplier">Supplier</option>
                  <option value="customer">Customer</option>
                </select>
             
            
          </div>
          </div>

          {showAlert && (
            <Alert type="success" message="Contacts Added Successfully" />
          )}
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
      <div className="pad"></div>
    </div>
  );
}

export default AddContacts;
