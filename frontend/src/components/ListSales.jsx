import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ListPurchases.css";
import Alert from "./Alert";
import { useNavigate, NavLink } from "react-router-dom";

function ListPurchases() {
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
  const [selectedSale, setSelectedSale] = useState(null);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [product, setProduct] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchOn, setSearchOn] = useState(false);

  const openViewDetailsModal = (purchase) => {
    setSelectedSale(purchase);
    setViewDetailsModal(true);
  };
  const openEditModal = (purchase) => {
    //console.log(purchase)
    setSelectedSale(purchase);
    setEditModal(true);
  };

  const openDeleteModal = (purchase) => {
    setSelectedSale(purchase);
    setDeleteModal(true);
  };

  const closeModals = () => {
    setEditModal(false);
    setDeleteModal(false);
    setViewDetailsModal(false);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/listSales")
      .then((res) => {
        if (res.data.Status === "Success") {
          if (searchOn !== true) {
            setData(res.data.result);
          }
          setAllData(res.data.result);
          //console.log(data)
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:3001/getProduct")
      .then((res) => {
        if (res.data.Status === "Success") {
          setProduct(res.data.result);
          //  console.log(product);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchOn, product]);

  const handleSearch = () => {
    setSearchOn(true);

    // if(startDate===null)
    // {
    //   setStartDate(new Date())
    // }

    // if(endDate===null)
    // {
    //   setEndDate(new Date())
    // }
    if (startDate && endDate) {
      const filteredData = allData.filter((item) => {
        const purchaseDate = new Date(item.date);
        return purchaseDate >= startDate && purchaseDate <= endDate;
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
      .delete("http://localhost:3001/deleteSale/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Delete sale Successfully");
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

  const handleUpdate = () => {
    const updatedSale = { ...selectedSale, total: calculateTotal() };

    axios
      .put(
        "http://localhost:3001/updateSale/" + updatedSale.sales_id,
        updatedSale
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          setShowEditAlert(true);
          setTimeout(() => {
            setShowEditAlert(false);
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

  const sums = data.reduce(
    (accumulator, currentObject) => {
      accumulator.ref_5_5 += currentObject.gas_5_5;
      accumulator.cyl_5_5 += currentObject.cyl_5_5;
      accumulator.ref_12 += currentObject.gas_12;
      accumulator.cyl_12 += currentObject.cyl_12;
      accumulator.ref_25 += currentObject.gas_25;
      accumulator.cyl_25 += currentObject.cyl_25;
      accumulator.ref_35 += currentObject.gas_35;
      accumulator.cyl_35 += currentObject.cyl_35;
      accumulator.ref_45 += currentObject.gas_45;
      accumulator.cyl_45 += currentObject.cyl_45;
      accumulator.all += currentObject.total;
      return accumulator;
    },
    {
      ref_5_5: 0,
      cyl_5_5: 0,
      ref_12: 0,
      cyl_12: 0,
      ref_25: 0,
      cyl_25: 0,
      ref_35: 0,
      cyl_35: 0,
      ref_45: 0,
      cyl_45: 0,
      all: 0,
    }
  );

  const calculateTotal = () => {
    let total =
      parseInt(selectedSale.gas_5_5) * parseInt(product[0].selling_price) +
      parseInt(selectedSale.gas_12) * parseInt(product[1].selling_price) +
      parseInt(selectedSale.gas_25) * parseInt(product[2].selling_price) +
      parseInt(selectedSale.gas_35) * parseInt(product[3].selling_price) +
      parseInt(selectedSale.gas_45) * parseInt(product[4].selling_price);
    return total;
  };

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
            Edit Sale Details
          </ModalHeader>
          <ModalBody>
            {selectedSale && (
              <form>
                <div className="row">
                  <div className="col">
                    <label htmlFor="purchaseStatus">Customer Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedSale.customer_name}
                      style={{ padding: "10px" }}
                      onChange={(e) =>
                        setSelectedSale({
                          ...selectedSale,
                          customer_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="5.5kg">Quantity of 5.5KG</label>
                    <input
                      type="number"
                      className="form-control"
                      value={selectedSale.gas_5_5}
                      onChange={(e) =>
                        setSelectedSale({
                          ...selectedSale,
                          gas_5_5: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label htmlFor="12kg">Quantity of 12KG</label>
                    <input
                      type="number"
                      className="form-control"
                      value={selectedSale.gas_12}
                      onChange={(e) =>
                        setSelectedSale({
                          ...selectedSale,
                          gas_12: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="25kg">Quantity of 25KG</label>
                    <input
                      type="number"
                      className="form-control"
                      value={selectedSale.gas_25}
                      onChange={(e) =>
                        setSelectedSale({
                          ...selectedSale,
                          gas_25: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label htmlFor="35kg">Quantity of 35KG</label>
                    <input
                      type="number"
                      className="form-control"
                      value={selectedSale.gas_35}
                      onChange={(e) =>
                        setSelectedSale({
                          ...selectedSale,
                          gas_35: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="45kg">Quantity of 45KG</label>
                    <input
                      type="number"
                      className="form-control"
                      value={selectedSale.gas_45}
                      onChange={(e) =>
                        setSelectedSale({
                          ...selectedSale,
                          gas_45: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <p>
                    <b>*Note:</b>You can not leave any input field empty.
                  </p>
                </div>
                <div className="row">
                  <div className="col">
                    <label htmlFor="grandTotal">Grand Total</label>
                    <input
                      type="number"
                      className="from-control"
                      value={calculateTotal()}
                      disabled
                    />
                  </div>
                </div>
              </form>
            )}
            {showEditAlert && (
              <Alert type="success" message="Data Updated Successfully" />
            )}
          </ModalBody>
          <ModalFooter style={{ marginTop: "3rem" }}>
            <button className="btn btn-outline-danger" onClick={handleUpdate}>
              Update
            </button>
            <button className="btn btn-outline-success" onClick={closeModals}>
              Close
            </button>
          </ModalFooter>
        </Modal>
      </div>
      <div>
        <Modal
          size="lg"
          isOpen={deleteModal}
          toggle={closeModals}
          className="delete-modal"
        >
          <ModalHeader className="delete_modal-header">
            Are you sure to delete the sale?
          </ModalHeader>
          <ModalBody>
            {showDeleteAlert && (
              <Alert type="success" message="Data Deleted Successfully" />
            )}
            {selectedSale && (
              <div
                className="d-flex justify-content-center"
                style={{ marginTop: "4rem" }}
              >
                <button
                  type="button"
                  className="btn btn-outline-danger mr-4"
                  onClick={() => handleDelete(selectedSale.sales_id)}
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
      <div>
        <Modal
          size="lg"
          isOpen={viewDetailsModal}
          toggle={closeModals}
          className="view-modal"
        >
          <ModalHeader className="view_modal-header">
            Sale Details
          </ModalHeader>
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
      </div>
      <div className="search-bar">
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: "25px",
            fontWeight: "3px",
          }}
        >
          LIST OF ALL SALES
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
          to="/home/addSale"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <button className="btn btn-success" type="submit" onClick={() => {}}>
            <i className="fa fa-plus-circle" aria-hidden="true">
              {" "}
              Add Sale
            </i>
          </button>
        </NavLink>
      </div>
      <div className="purchase-table">
        <table className="table table-striped">
          <thead className="table-head">
            <tr>
              <th scope="col">Sale Date</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Location</th>
              <th scope="col">Delivery Date</th>
              <th scope="col">Ref 5.5</th>
              <th scope="col">Cyl 5.5</th>
              <th scope="col">Ref 12</th>
              <th scope="col">Cyl 12</th>
              <th scope="col">Ref 25</th>
              <th scope="col">Cyl 25</th>
              <th scope="col">Ref 35</th>
              <th scope="col">Cyl 35</th>
              <th scope="col">Ref 45</th>
              <th scope="col">Cyl 45</th>
              <th scope="col">Grand Total</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th scope="row">{formatDate(item.date)}</th>
                <td>{item.customer_name}</td>
                <td>{item.location}</td>
                <td>{formatDate(item.delivery_date)}</td>
                <td>{item.gas_5_5}</td>
                <td>{item.cyl_5_5}</td>
                <td>{item.gas_12}</td>
                <td>{item.cyl_12}</td>
                <td>{item.gas_25}</td>
                <td>{item.cyl_25}</td>
                <td>{item.gas_35}</td>
                <td>{item.cyl_35}</td>
                <td>{item.gas_45}</td>
                <td>{item.cyl_45}</td>
                <td>{item.total}</td>
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
              <td>{sums.ref_5_5}</td>
              <td>{sums.cyl_5_5}</td>
              <td>{sums.ref_12}</td>
              <td>{sums.cyl_12}</td>
              <td>{sums.ref_25}</td>
              <td>{sums.cyl_25}</td>
              <td>{sums.ref_35}</td>
              <td>{sums.cyl_35}</td>
              <td>{sums.ref_45}</td>
              <td>{sums.cyl_45}</td>
              <td>{sums.all}</td>
              <td> </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="pad"> </div>
    </div>
  );
}

export default ListPurchases;
