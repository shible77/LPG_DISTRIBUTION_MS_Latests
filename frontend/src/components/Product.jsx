import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Product.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Alert from "./Alert";
import { NavLink, useNavigate } from "react-router-dom";

function Product() {
  const [data, setData] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
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
      .get("http://localhost:3001/collectProduct")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.result);
        } else {
          console.log(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const openEditModal = (product) => {
    //console.log(product)
    setSelectedProduct(product);
    setEditModal(true);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setDeleteModal(true);
  };

  const closeModals = () => {
    setEditModal(false);
    setDeleteModal(false);
  };

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete("http://localhost:3001/deleteProduct/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          // console.log('Delete product Successfully')
          // window.location.reload(true)
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

  const updateData = (e) => {
    e.preventDefault();
    //console.log(selectedProduct);
    axios
      .put(
        "http://localhost:3001/updateProduct/" + selectedProduct.product_id,
        selectedProduct
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          //console.log('Update Successful')
          setShowUpdateAlert(true);
          setTimeout(() => {
            setShowUpdateAlert(false);
            closeModals();
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal size="lg" isOpen={editModal} toggle={closeModals}>
        <ModalHeader className="d-flex justify-content-center">
          Edit Product Information
        </ModalHeader>
        <ModalBody>
          {selectedProduct && (
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      Product Name:
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={selectedProduct.product_name}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          product_name: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled>
                        Please select
                      </option>
                      <option value="Omera 5.5 Kg Gas">Omera 5.5 Kg Gas</option>
                      <option value="Omera 5.5 Kg Cylidner">
                        Omera 5.5 Kg Cylidner
                      </option>
                      <option value="Omera 12 Kg Gas">Omera 12 Kg Gas</option>
                      <option value="Omera 12 Kg Cylidner">
                        Omera 12 Kg Cylidner
                      </option>
                      <option value="Omera 25 Kg Gas">Omera 25 Kg Gas</option>
                      <option value="Omera 25 Kg Cylidner">
                        Omera 25 Kg Cylidner
                      </option>
                      <option value="Omera 35 Kg Gas">Omera 35 Kg Gas</option>
                      <option value="Omera 35 Kg Cylidner">
                        Omera 35 Kg Cylidner
                      </option>
                      <option value="Omera 45 Kg Gas">Omera 45 Kg Gas</option>
                      <option value="Omera 45 Kg Cylidner">
                        Omera 45 Kg Cylidner
                      </option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Product Type:
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={selectedProduct.product_type}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          product_type: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled>
                        Please Select
                      </option>
                      <option value="single">Single</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      Product Category:
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={selectedProduct.product_category}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          product_category: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled>
                        Please Select
                      </option>
                      <option value="Gas">Gas</option>
                      <option value="Cylinder">Cylinder</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      Brand:
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={selectedProduct.brand}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          brand: e.target.value,
                        })
                      }
                    >
                      <option value="">Please Select</option>
                      <option value="Omera">Omera</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Per Unit Purchasing Price :
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedProduct.unit}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            unit: e.target.value,
                          })
                        }
                        autoComplete="off"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Per Unit Selling Price:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedProduct.selling_price}
                        onChange={(e) =>
                          setSelectedProduct({
                            ...selectedProduct,
                            selling_price: e.target.value,
                          })
                        }
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
          {showUpdateAlert && (
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
      <Modal size="lg" isOpen={deleteModal} toggle={closeModals}>
        <ModalHeader className="d-flex justify-content-center">
          Are you sure to delete the product?
        </ModalHeader>
        <ModalBody>
          {showAlert && (
            <Alert type="success" message="Data Deleted Successfully" />
          )}
          {selectedProduct && (
            <div
              className="d-flex justify-content-center"
              style={{ marginTop: "4rem" }}
            >
              <button
                type="button"
                className="btn btn-outline-danger mr-4"
                onClick={() => handleDelete(selectedProduct.product_id)}
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
      <div className="head">
        <h4>List Of All Products</h4>
      </div>
      <div className="addButton2">
        <NavLink className="nav-link" to="/home/addProducts">
          <button className="btn btn-success" type="submit" onClick={() => {}}>
            <i className="fa fa-plus-circle" aria-hidden="true">
              {" "}
              Add Product
            </i>
          </button>
        </NavLink>
      </div>
      <div className="my-table">
        <table className="table table-striped">
          <thead className="table-head">
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Product Type </th>
              <th scope="col">Product Category</th>
              <th scope="col">Brand</th>
              <th scope="col">Purchasing Price</th>
              <th scope="col">Selling Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.product_name}</th>
                <td>{item.product_type}</td>
                <td>{item.product_category}</td>
                <td>{item.brand}</td>
                <td>{item.unit}</td>
                <td>{item.selling_price}</td>

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
        </table>
      </div>
      <div className="pad"> </div>
    </>
  );
}

export default Product;
