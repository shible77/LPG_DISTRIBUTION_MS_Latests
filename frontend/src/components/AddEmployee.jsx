import React, { useState } from "react";
import "./AddEmployee.css";
import axios from "axios";
import Alert from "./Alert";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useEffect} from 'react'

function AddEmployee() {
  const preset_key = "uploadimage";
  const cloud_name = "doh71p23w";
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    present_address: "",
    permanent_address: "",
    mobile_no: "",
    designation: "",
    category: "",
    salary: "",
    active_status: "",
    employee_image: "",
  });

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve authentication status from localStorage
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    setLoading(true);
    await axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData,
        {
          withCredentials: false,
        }
      )
      .then((res) => {
        //console.log(res.data.secure_url);
        setData({ ...data, employee_image: res.data.secure_url });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/addEmployee", data)
      .then((res) => {
        if (res.data.Status === "Success") {
          setData({
            ...data,
            first_name: "",
            last_name: "",
            date_of_birth: "",
            present_address: "",
            permanent_address: "",
            mobile_no: "",
            designation: "",
            category: "",
            salary: "",
            active_status: "",
            employee_image: "",
          });
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
      <div className="addButton">
        <NavLink className="nav-link" to="/home/employee">
          <button className="btn btn-success" type="submit" onClick={() => {}}>
          <i className="fa fa-list-ul" aria-hidden="true">
              {" "}
              List of Employees
            </i>
          </button>
        </NavLink>
      </div>
      <div className="container">
        <h3>ENTER THE FOLLOWING INFORMATION TO ADD A NEW EMPLOYEE</h3>
        <form>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="first_name"
                  value={data.first_name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      first_name: e.target.value,
                    })
                  }
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="last_name"
                  value={data.last_name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      last_name: e.target.value,
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
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Date of Birth:
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateOfBirth"
                  name="date_of_birth"
                  value={data.date_of_birth}
                  onChange={(e) =>
                    setData({
                      ...data,
                      date_of_birth: e.target.value,
                    })
                  }
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="mobileNo" className="form-label">
                  Mobile Number:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobileNo"
                  name="mobile_no"
                  value={data.mobile_no}
                  onChange={(e) =>
                    setData({
                      ...data,
                      mobile_no: e.target.value,
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
                <label htmlFor="presentAddress" className="form-label">
                  Present Address:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="presentAddress"
                  name="present_address"
                  value={data.present_address}
                  onChange={(e) =>
                    setData({
                      ...data,
                      present_address: e.target.value,
                    })
                  }
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="permanentAddress" className="form-label">
                  Permanent Address:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="permanentAddress"
                  name="permanent_address"
                  value={data.permanent_address}
                  onChange={(e) =>
                    setData({
                      ...data,
                      permanent_address: e.target.value,
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
                <label htmlFor="designation" className="form-label">
                  Designation:
                </label>
                <select
                  className="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  value={data.designation}
                  onChange={(e) =>
                    setData({
                      ...data,
                      designation: e.target.value,
                    })
                  }
                >
                  <option disabled value="">
                    Select Please
                  </option>
                  <option value="Manager">Manager</option>
                  <option value="Operations Manager">Operations Manager</option>
                  <option value="HR Manager">HR Manager</option>
                  <option value="Accountants">Accountants</option>
                  <option value="Customer Service Representatives">
                    Customer Service Representatives
                  </option>
                  <option value="Sales Representatives:">
                    Sales Representatives
                  </option>
                  <option value="Delivery Drivers">Delivery Drivers</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category:
                </label>
                <select
                  className="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  value={data.category}
                  onChange={(e) =>
                    setData({
                      ...data,
                      category: e.target.value,
                    })
                  }
                >
                  <option disabled value="">
                    Select Please
                  </option>
                  <option value="Managerial">Managerial</option>
                  <option value="Finance Personel">Finance Personel</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Sales and Marketing">
                    Sales and Marketing
                  </option>
                  <option value="Field Worker">Field Worker</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="salary" className="form-label">
                  Salary:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="salary"
                  name="salary"
                  value={data.salary}
                  onChange={(e) =>
                    setData({
                      ...data,
                      salary: e.target.value,
                    })
                  }
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="activeStatus" className="form-label">
                  Active Status:
                </label>
                <select
                  className="form-select"
                  id="selectedOption"
                  name="selectedOption"
                  value={data.active_status}
                  onChange={(e) => {
                    setData({ ...data, active_status: e.target.value });
                  }}
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  <option value="On">On</option>
                  <option value="Off">Off</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="employeeImage" className="form-label">
              Upload Image:
            </label>
            <input
              className="form-control form-control-sm"
              id="formFileSm"
              type="file"
              name="employee_image"
              accept="image/*"
              onChange={handleInputChange}
              required
            />
          </div>
          {loading && (
            <div className="loading-spinner" role="status">
              <span className="spinner"></span>
            </div>
          )}

          {showAlert && (
            <Alert type="success" message="Employee Added Successfully" />
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

export default AddEmployee;
