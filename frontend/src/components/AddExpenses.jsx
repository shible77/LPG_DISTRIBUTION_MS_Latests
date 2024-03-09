import React, { useState } from "react";
import "./AddIncome.css";
import axios from "axios";
import Alert from "./Alert";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AddExpenses() {

  const [data, setData] = useState({
    expense_name: "",
    customer_name: "",
    customer_mobile: "",
    date: "",
    amount: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve authentication status from localStorage
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/addExpense", data)
      .then((res) => {
        if (res.data.Status === "Success") {
          setData({
            ...data,
            expense_name: "",
            customer_name: "",
            customer_mobile: "",
            date: "",
            amount: "",
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
        <NavLink className="nav-link" to="/home/expenses">
          <button className="btn btn-success" type="submit" onClick={() => {}}>
            <i className="fa fa-list-ul" aria-hidden="true">
              {" "}
              List of Expenses
            </i>
          </button>
        </NavLink>
      </div>
      <div className="container">
        <h2>ADD A NEW EXPENSES</h2>
        <form>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  Customer Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="first_name"
                  value={data.customer_name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      customer_name: e.target.value,
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
                  Mobile:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="last_name"
                  value={data.customer_mobile}
                  onChange={(e) =>
                    setData({
                      ...data,
                      customer_mobile: e.target.value,
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
                  Date:
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateOfBirth"
                  name="date_of_birth"
                  value={data.date}
                  onChange={(e) =>
                    setData({
                      ...data,
                      date: e.target.value,
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
                  Expense Details:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobileNo"
                  name="mobile_no"
                  value={data.expense_name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      expense_name: e.target.value,
                    })
                  }
                  required
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="salary" className="form-label">
                Amount:
              </label>
              <input
                type="text"
                className="form-control"
                id="salary"
                name="salary"
                value={data.amount}
                onChange={(e) =>
                  setData({
                    ...data,
                    amount: e.target.value,
                  })
                }
                required
                autoComplete="off"
              />
            </div>
          </div>

          {showAlert && (
            <Alert type="success" message="Expense Added Successfully" />
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

export default AddExpenses;
