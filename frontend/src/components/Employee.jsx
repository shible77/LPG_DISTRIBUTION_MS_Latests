import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Employee.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

// import LoadingSpinner from "./LoadingSpinner";

function Employee(props) {
  const preset_key = "uploadimage";
  const cloud_name = "doh71p23w";
  const [data, setData] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [loading, setLoading] = useState(false);

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
      .get("http://localhost:3001/collectEmployee")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.result);
          // console.log(res.data.result)
        } else {
          console.log(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setEditModal(true);
  };

  const openViewDetailsModal = (employee) => {
    setSelectedEmployee(employee);
    setViewDetailsModal(true);
  };

  const openDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setDeleteModal(true);
  };

  const closeModals = () => {
    setEditModal(false);
    setViewDetailsModal(false);
    setDeleteModal(false);
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/deleteEmployee/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          // console.log('Delete Employee Successfully')
          // window.location.reload(true);
          setShowDeleteAlert(true);
          setTimeout(() => {
            setShowDeleteAlert(false);
            closeModals();
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };

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
        setSelectedEmployee({
          ...selectedEmployee,
          employee_image: res.data.secure_url,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateData = (e) => {
    e.preventDefault();
    //console.log(selectedEmployee)
    axios
      .put(
        "http://localhost:3001/updateEmployee/" + selectedEmployee.employee_id,
        selectedEmployee
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          //console.log('Update Successful')
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            closeModals();
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rowsOfCards = [];
  for (let i = 0; i < data.length; i += 5) {
    const row = data.slice(i, i + 5);
    rowsOfCards.push(
      <tr key={i}>
        {row.map((item) => (
          <td key={item.employee_id}>
            <div className="card">
              <img
                src={`${item.employee_image}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h6 className="card-title">
                  {item.first_name + " " + item.last_name}
                </h6>
                <p className="card-text">{item.designation}</p>
                <p className="card-text">{item.mobile_no}</p>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-info dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Actions
                  </button>
                  <div className="dropdown-menu">
                    <div className="d-grid gap-2">
                      <button
                        className="btn"
                        onClick={() => openViewDetailsModal(item)}
                      >
                        <i className="fa fa-eye" aria-hidden="true"></i> View
                        Details
                      </button>
                      <button
                        className="btn"
                        onClick={() => openEditModal(item)}
                      >
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                        ></i>{" "}
                        Edit
                      </button>

                      <button
                        className="btn"
                        onClick={() => openDeleteModal(item)}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>{" "}
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        ))}
      </tr>
    );
  }

  return (
    <div>
      <div>
        <Modal
          size="lg"
          isOpen={editModal}
          toggle={closeModals}
          className="edit-modal"
        >
          <ModalHeader className="edit_modal-header">
            Edit Employee Details
          </ModalHeader>
          <ModalBody>
            {selectedEmployee && (
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
                        value={selectedEmployee.first_name}
                        onChange={(e) =>
                          setSelectedEmployee({
                            ...selectedEmployee,
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
                        value={selectedEmployee.last_name}
                        onChange={(e) =>
                          setSelectedEmployee({
                            ...selectedEmployee,
                            last_name: e.target.value,
                          })
                        }
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>

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
                    value={formatDate(selectedEmployee.date_of_birth)}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        date_of_birth: e.target.value,
                      })
                    }
                    required
                    autoComplete="off"
                    style={{ padding: "5px 5px" }}
                  />
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
                        value={selectedEmployee.present_address}
                        onChange={(e) =>
                          setSelectedEmployee({
                            ...selectedEmployee,
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
                        name="parmanent_address"
                        value={selectedEmployee.parmanent_address}
                        onChange={(e) =>
                          setSelectedEmployee({
                            ...selectedEmployee,
                            parmanent_address: e.target.value,
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
                      <label htmlFor="mobileNo" className="form-label">
                        Mobile Number:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="mobileNo"
                        name="mobile_no"
                        value={selectedEmployee.mobile_no}
                        onChange={(e) =>
                          setSelectedEmployee({
                            ...selectedEmployee,
                            mobile_no: e.target.value,
                          })
                        }
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="designation" className="form-label">
                        Designation:
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={selectedEmployee.designation}
                        onChange={(e) =>
                          setSelectedEmployee({
                            ...selectedEmployee,
                            designation: e.target.value,
                          })
                        }
                      >
                        <option disabled value="">
                          Select Please
                        </option>
                        <option value="Manager">Manager</option>
                        <option value="Operations Manager">
                          Operations Manager
                        </option>
                        <option value="HR Manager">HR Manager</option>
                        <option value="Accountants">Accountants</option>
                        <option value="Customer Service Representatives">
                          Customer Service Representatives
                        </option>
                        <option value="Sales Representatives:">
                          Sales Representatives
                        </option>
                        <option value="Delivery Drivers">
                          Delivery Drivers
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">
                        Category:
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={selectedEmployee.category}
                        onChange={(e) =>
                          setSelectedEmployee({
                            ...selectedEmployee,
                            category: e.target.value,
                          })
                        }
                      >
                        <option disabled value="">
                          Select Please
                        </option>
                        <option value="Managerial">Managerial</option>
                        <option value="Finance Personel">
                          Finance Personel
                        </option>
                        <option value="Customer Service">
                          Customer Service
                        </option>
                        <option value="Sales and Marketing">
                          Sales and Marketing
                        </option>
                        <option value="Field Worker">Field Worker</option>
                      </select>
                    </div>
                  </div>
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
                        value={selectedEmployee.salary}
                        onChange={(e) =>
                          setSelectedEmployee({
                            ...selectedEmployee,
                            salary: e.target.value,
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
                      <label htmlFor="activeStatus" className="form-label">
                        Active Status:
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        value={selectedEmployee.active_status}
                        onChange={(e) => {
                          setSelectedEmployee({
                            ...selectedEmployee,
                            active_status: e.target.value,
                          });
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
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="employeeImage" className="form-label">
                        Change Image:
                      </label>
                      <input
                        className="form-control form-control-sm"
                        id="formFileSm"
                        type="file"
                        name="employee_image"
                        accept="image/*"
                        onChange={handleInputChange}
                        required
                        style={{ padding: "5px 5px" }}
                      />
                    </div>
                  </div>
                </div>
                {loading && (
                  <div className="loading-spinner" role="status">
                    <span className="spinner"></span>
                  </div>
                )}
              </form>
            )}
            {showAlert && (
              <Alert type="success" message="Data Updated Successfully" />
            )}
          </ModalBody>
          <ModalFooter style={{ marginTop: "3rem" }}>
            <button className="btn btn-outline-danger" onClick={updateData}>
              Update
            </button>
            <button className="btn btn-outline-success" onClick={closeModals}>
              Close
            </button>
          </ModalFooter>
        </Modal>
        <Modal
          size="lg"
          isOpen={viewDetailsModal}
          toggle={closeModals}
          className="view-modal"
        >
          {selectedEmployee && (
            <ModalHeader className="d-flex justify-content-center">{`Details of ${selectedEmployee.first_name} ${selectedEmployee.last_name}`}</ModalHeader>
          )}

          <ModalBody>
            {selectedEmployee && (
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
                        value={selectedEmployee.first_name}
                        readOnly
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
                        value={selectedEmployee.last_name}
                        readOnly
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
                        value={formatDate(selectedEmployee.date_of_birth)}
                        readOnly
                        style={{ padding: "5px 5px" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Start Work:
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateOfBirth"
                        name="date_of_birth"
                        value={formatDate(selectedEmployee.start_work)}
                        readOnly
                        style={{ padding: "5px 5px" }}
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
                        value={selectedEmployee.present_address}
                        readOnly
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
                        name="parmanent_address"
                        value={selectedEmployee.parmanent_address}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
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
                        value={selectedEmployee.mobile_no}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="designation" className="form-label">
                        Designation:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="designation"
                        name="designation"
                        value={selectedEmployee.designation}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">
                        Category:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="category"
                        name="category"
                        value={selectedEmployee.category}
                        readOnly
                      />
                    </div>
                  </div>
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
                        value={selectedEmployee.salary}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="activeStatus" className="form-label">
                    Active Status:
                  </label>
                  <select
                    className="form-select"
                    id="selectedOption"
                    name="selectedOption"
                    value={
                      selectedEmployee.active_status === "on"
                        ? "Option 1"
                        : "Option 2"
                    }
                    disabled
                  >
                    <option value="Option 1">on</option>
                    <option value="Option 2">off</option>
                  </select>
                </div>
              </form>
            )}
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={closeModals}
            >
              Close
            </button>
          </ModalFooter>
        </Modal>

        <Modal
          size="lg"
          isOpen={deleteModal}
          toggle={closeModals}
          className="delete-modal"
        >
          <ModalHeader className="delete_modal-header">
            Are you sure to delete the employee?
          </ModalHeader>
          <ModalBody>
            {showDeleteAlert && (
              <Alert type="success" message="Data Deleted Successfully" />
            )}
            {selectedEmployee && (
              <div
                className="d-flex justify-content-center"
                style={{ marginTop: "4rem" }}
              >
                <button
                  type="button"
                  className="btn btn-outline-danger mr-4"
                  onClick={() => handleDelete(selectedEmployee.employee_id)}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success ml-4"
                  onClick={closeModals}
                >
                  Cancel
                </button>
              </div>
            )}
          </ModalBody>
        </Modal>
      </div>
      <div className="header">
        <h4>List Of ALL Employees</h4>
      </div>
      <div className="addButton4">
        <NavLink className="nav-link" to="/home/addEmployee">
          <button className="btn btn-success" type="submit" onClick={() => {}}>
            <i className="fa fa-plus-circle" aria-hidden="true">
              {" "}
              Add Employee
            </i>
          </button>
        </NavLink>
      </div>
      <div className="table-container">
        <table className="table">
          <tbody>{rowsOfCards}</tbody>
        </table>
      </div>
      <div className="pad"></div>
    </div>
  );
}

export default Employee;
