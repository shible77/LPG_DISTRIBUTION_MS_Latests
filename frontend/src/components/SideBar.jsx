import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./SideBar.css";

function SideBar(props) {
  const location = useLocation();
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionClick = (accordionId) => {
    if (accordionId === activeAccordion) {
      // If the same accordion is clicked again, collapse it
      setActiveAccordion(null);
    } else {
      setActiveAccordion(accordionId);
    }
  };

  return (
    <div style={{ marginTop: "4rem" }}>
      <div className="sidebar">
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingZero">
              <button
                className={`accordion-button ${
                  activeAccordion === "flush-collapseZero" ? "" : "collapsed"
                }`}
                type="button"
                onClick={() => handleAccordionClick("flush-collapseZero")}
              >
                <i className="fa fa-fw fa-users"></i>User Management
              </button>
            </h2>
            <div
              id="flush-collapseZero"
              className={`accordion-collapse collapse ${
                activeAccordion === "flush-collapseZero" ? "show" : ""
              }`}
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body" style={{ padding: 0 }}>
                <NavLink
                  activeclassname="active"
                  to="/home/userManagement"
                  className="font"
                >
                  <i className="fa fa-fw fa-users"></i>User Management
                </NavLink>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingZero1">
              <button
                className={`accordion-button ${
                  activeAccordion === "flush-collapseZero1" ? "" : "collapsed"
                }`}
                type="button"
                onClick={() => handleAccordionClick("flush-collapseZero1")}
              >
                <i className="fa fa-fw fa-address-book-o"></i>Contacts
              </button>
            </h2>
            <div
              id="flush-collapseZero1"
              className={`accordion-collapse collapse ${
                activeAccordion === "flush-collapseZero1" ? "show" : ""
              }`}
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body" style={{ padding: 0 }}>
                <NavLink
                  activeclassname="active"
                  to="/home/addContact"
                  className="font"
                >
                  <i class="fa fa-address-book" aria-hidden="true"></i>Add
                  Contacts
                </NavLink>
                <NavLink
                  activeclassname="active"
                  to="/home/contactCustomer"
                  className="font"
                >
                  <i className="fa fa-fw fa-address-book-o"></i>Customer Contact
                </NavLink>
                <NavLink
                  activeclassname="active"
                  to="/home/contactSupplier"
                  className="font"
                >
                  <i className="fa fa-fw fa-address-book-o"></i>Supplier Contact
                </NavLink>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className={`accordion-button ${
                  activeAccordion === "flush-collapseOne" ? "" : "collapsed"
                }`}
                type="button"
                onClick={() => handleAccordionClick("flush-collapseOne")}
              >
                <i className="fa fa-fw fa-user-o"></i>Employees
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className={`accordion-collapse collapse ${
                activeAccordion === "flush-collapseOne" ? "show" : ""
              }`}
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body" style={{ padding: 0 }}>
                <NavLink
                  activeclassname="active"
                  to="/home/employee"
                  className="font"
                >
                  <i className="fa fa-fw fa-user" aria-hidden="true"></i>
                  Employees
                </NavLink>
                <NavLink
                  activeclassname="active"
                  to="/home/addEmployee"
                  className="font"
                >
                  <i className="fa fa-fw fa-user-plus" aria-hidden="true"></i>
                  Add Employees
                </NavLink>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${
                  activeAccordion === "flush-collapseTwo" ? "" : "collapsed"
                }`}
                type="button"
                onClick={() => handleAccordionClick("flush-collapseTwo")}
              >
                <i className="fa fa-fw fa-cubes"></i>Products
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              className={`accordion-collapse collapse ${
                activeAccordion === "flush-collapseTwo" ? "show" : ""
              }`}
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body" style={{ padding: 0 }}>
                <NavLink
                  activeclassname="active"
                  to="/home/products"
                  className="font"
                >
                  <i className="fa fa-fw fa-cube"></i>Products
                </NavLink>
                <NavLink
                  activeclassname="active"
                  to="/home/addProducts"
                  className="font"
                >
                  <i className="fa fa-fw fa-plus-square-o"></i>Add Products
                </NavLink>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${
                  activeAccordion === "flush-collapseThree" ? "" : "collapsed"
                }`}
                type="button"
                onClick={() => handleAccordionClick("flush-collapseThree")}
              >
                <i className="fa fa-fw fa-arrow-down"></i>Purchases
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              className={`accordion-collapse collapse ${
                activeAccordion === "flush-collapseThree" ? "show" : ""
              }`}
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body" style={{ padding: 0 }}>
                <NavLink
                  activeclassname="active"
                  to="/home/listPurchases"
                  className="font"
                >
                  <i className="fa fa-list-ol" aria-hidden="true"></i> List of
                  Purchases
                </NavLink>
                <NavLink
                  activeclassname="active"
                  to="/home/addPurchases"
                  className="font"
                >
                  <i className="fa fa-cart-plus" aria-hidden="true"></i> Add
                  Purchases
                </NavLink>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${
                  activeAccordion === "flush-collapseFourth" ? "" : "collapsed"
                }`}
                type="button"
                onClick={() => handleAccordionClick("flush-collapseFourth")}
              >
                <i className="fa fa-fw fa-arrow-up"></i>Sell
              </button>
            </h2>
            <div
              id="flush-collapseFourth"
              className={`accordion-collapse collapse ${
                activeAccordion === "flush-collapseFourth" ? "show" : ""
              }`}
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body" style={{ padding: 0 }}>
                <NavLink
                  activeclassname="active"
                  to="/home/listSales"
                  className="font"
                >
                  <i className="fa fa-list-ul" aria-hidden="true"></i> List of
                  Sales
                </NavLink>
                <NavLink
                  activeclassname="active"
                  to="/home/addSale"
                  className="font"
                >
                  <i className="fa fa-plus-square" aria-hidden="true"></i> Add
                  Sale
                </NavLink>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingZero2">
              <button
                className={`accordion-button ${
                  activeAccordion === "flush-collapseZero2" ? "" : "collapsed"
                }`}
                type="button"
                onClick={() => handleAccordionClick("flush-collapseZero2")}
              >
                <i className="fa fa-fw fa-cubes"></i>Stock Management
              </button>
            </h2>
            <div
              id="flush-collapseZero2"
              className={`accordion-collapse collapse ${
                activeAccordion === "flush-collapseZero2" ? "show" : ""
              }`}
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body" style={{ padding: 0 }}>
                <NavLink
                  activeclassname="active"
                  to="/home/stockList"
                  className="font"
                >
                  <i className="fa fa-fw fa-cubes"></i>Stock List
                </NavLink>
                <NavLink
                  activeclassname="active"
                  to="/home/stockReport"
                  className="font"
                >
                  <i className="fa fa-fw fa-file-text"></i>Stock Track
                </NavLink>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${
                  activeAccordion === "flush-collapseFifth" ? "" : "collapsed"
                }`}
                type="button"
                onClick={() => handleAccordionClick("flush-collapseFifth")}
              >
                <i className="fa fa-fw fa-calculator"></i>Accounts
              </button>
            </h2>
            <div
              id="flush-collapseFifth"
              className={`accordion-collapse collapse ${
                activeAccordion === "flush-collapseFifth" ? "show" : ""
              }`}
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body" style={{ padding: 0 }}>
                <NavLink
                  activeclassname="active"
                  to="/home/accounts"
                  className="font"
                >
                  <i className="fa fa-fw fa-calculator"></i>Accounts
                </NavLink>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${
                  activeAccordion === "flush-collapseSixth" ? "" : "collapsed"
                }`}
                type="button"
                onClick={() => handleAccordionClick("flush-collapseSixth")}
              >
                <i className="fa fa-fw fa-file-text"></i>Reports
              </button>
            </h2>
            <div
              id="flush-collapseSixth"
              className={`accordion-collapse collapse ${
                activeAccordion === "flush-collapseSixth" ? "show" : ""
              }`}
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body" style={{ padding: 0 }}>
                <NavLink
                  activeclassname="active"
                  to="/home/sells_Report"
                  className="font"
                >
                  <i className="fa fa-fw fa-file-text"></i>Sells Reports
                </NavLink>

                <NavLink
                  activeclassname="active"
                  to="/home/purchase_Report"
                  className="font"
                >
                  <i className="fa fa-fw fa-file-text"></i>Purchase Reports
                </NavLink>

                <NavLink
                  activeclassname="active"
                  to="/home/sells_Summary_Report"
                  className="font"
                >
                  <i className="fa fa-fw fa-file-text"></i>Sells Summary
                </NavLink>

                <NavLink
                  activeclassname="active"
                  to="/home/purchases_Summary_Report"
                  className="font"
                >
                  <i className="fa fa-fw fa-file-text"></i>Purchase Summary
                </NavLink>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${
                  activeAccordion === "flush-collapseSeventh" ? "" : "collapsed"
                }`}
                type="button"
                onClick={() => handleAccordionClick("flush-collapseSeventh")}
              >
                <i className="fa fa-fw fa-minus-circle"></i>Expanses
              </button>
            </h2>
            <div
              id="flush-collapseSeventh"
              className={`accordion-collapse collapse ${
                activeAccordion === "flush-collapseSeventh" ? "show" : ""
              }`}
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body" style={{ padding: 0 }}>
                <NavLink
                  activeclassname="active"
                  to="/home/expenses"
                  className="font"
                >
                  <i className="fa fa-fw fa-minus-circle"></i>List of Expenses
                </NavLink>
                <NavLink
                  activeclassname="active"
                  to="/home/addExpenses"
                  className="font"
                >
                  <i className="fa fa-plus-square" aria-hidden="true"></i> Add
                  Expenses
                </NavLink>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${
                  activeAccordion === "flush-collapse8th" ? "" : "collapsed"
                }`}
                type="button"
                onClick={() => handleAccordionClick("flush-collapse8th")}
              >
                <i className="fa fa-fw fa-plus-circle"></i>Income
              </button>
            </h2>
            <div
              id="flush-collapse8th"
              className={`accordion-collapse collapse ${
                activeAccordion === "flush-collapse8th" ? "show" : ""
              }`}
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body" style={{ padding: 0 }}>
                <NavLink
                  activeclassname="active"
                  to="/home/income"
                  className="font"
                >
                  <i className="fa fa-fw fa-plus-circle"></i>List of Income
                </NavLink>
                <NavLink
                  activeclassname="active"
                  to="/home/addIncome"
                  className="font"
                >
                  <i className="fa fa-plus-square" aria-hidden="true"></i> Add
                  Income
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        {location.pathname === "/home" ? (
          <h1 style={{ marginTop: "13rem" }}>{`Welcome ${props.userName}`}</h1>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default SideBar;

//comment
