import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Expenses.css";
import Alert from "./Alert";
import { useNavigate, NavLink } from "react-router-dom";

function Expense() {
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve authentication status from localStorage
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchOn, setSearchOn] = useState(false);

  const openDeleteModal = (purchase) => {
    setSelectedExpense(purchase);
    setDeleteModal(true);
  };

  const closeModals = () => {
    setDeleteModal(false);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/Expenses")
      .then((res) => {
        if (res.data.Status === "Success") {
          if (searchOn !== true) {
            setData(res.data.result);
          }
          setAllData(res.data.result);
          //console.log(data)s
        }
      })
      .catch((err) => {
        console.log(err);
      });

    
  }, [searchOn, data]);

  const handleSearch = () => {
    setSearchOn(true);
    if (startDate && endDate) {
      const filteredData = allData.filter((item) => {
        const expenseDate = new Date(item.date);
        return expenseDate >= startDate && expenseDate <= endDate;
      });
      console.log(filteredData);
      setData(filteredData);
      console.log(data);
    } else {
      console.error("Please select both start and end dates for the search.");
    }
  };
  
  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    document.getElementById("startDateInput").value = "";
    document.getElementById("endDateInput").value = "";
    setSearchOn(false);
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/deleteExpense/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Delete expense Successfully");
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

  data.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  const sum = data.reduce(
    (total, item) => total + item.amount, 0
  );

  return (
    <div>
      <div>
        <Modal
          size="lg"
          isOpen={deleteModal}
          toggle={closeModals}
          className="delete-modal"
        >
          <ModalHeader className="delete_modal-header">
            Are you sure to delete the purchase?
          </ModalHeader>
          <ModalBody>
            {showDeleteAlert && (
              <Alert type="success" message="Data Deleted Successfully" />
            )}
            {selectedExpense && (
              <div
                className="d-flex justify-content-center"
                style={{ marginTop: "4rem" }}
              >
                <button
                  type="button"
                  className="btn btn-outline-danger mr-4"
                  onClick={() => handleDelete(selectedExpense.expense_id)}
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
      <div className="search-bar">
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: "30px",
            fontWeight: "3px",
          }}
        >
          LIST OF ALL EXPENSE
        </p>
        <div className="row mb-4">
          <div className="col">
            <label>From Date:</label>
            <input
              type="date"
              id="startDateInput"
              className="form-control"
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
          </div>
          <div className="col">
            <label>To Date:</label>
            <input
              type="date"
              id="endDateInput"
              className="form-control"
              onChange={(e) => setEndDate(new Date(e.target.value))}
            />
          </div>
          <div
            className="col"
            style={{ marginRight: "4rem", marginTop: "2rem" }}
          >
            <button
              className="btn btn-outline-info"
              onClick={handleSearch}
              style={{ marginRight: "2rem" }}
            >
              Search
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={handleClear}
              style={{ marginLeft: "2rem" }}
            >
              Clear Dates
            </button>
          </div>
        </div>
      </div>
      <div>
      <NavLink
          className="nav-link"
          to="/home/addExpenses"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <button className="btn btn-success" type="submit" onClick={() => {}}>
            <i className="fa fa-plus-circle" aria-hidden="true">
              {" "}
              Add Expense
            </i>
          </button>
        </NavLink>
      </div>
      <div className="purchase-table">
        <table className="table table-striped">
          <thead className="table-head">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Details</th>
              <th scope="col">Custmer</th>
              <th scope="col">Mobile</th>
              <th scope="col">Amount</th>
              <th scope="col">Action</th>
              
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              
              <tr key={index}>
                <th scope="row">{formatDate(item.date)}</th>
                <td>{item.expense_name}</td>
                <td>{item.customer_name}</td>
                <td>{item.customer_mobile}</td>
                <td>{item.amount}</td>
                <td>
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
                          onClick={() => openDeleteModal(item)}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>{" "}
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              
            ))}
          </tbody>
          <tfoot>
            <tr className="sticky-bottom-row">
              <th>Total</th>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>{sum}</td>
              <td> </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="pad"> </div>
    </div>
  );
}

export default Expense;
