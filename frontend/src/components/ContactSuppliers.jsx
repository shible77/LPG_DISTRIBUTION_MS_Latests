import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Product.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Alert from "./Alert";

function ContactSuppliers() {
  const [data, setData] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/supplierContacts")
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

  const handleDelete = (contact_id) => {
    console.log(contact_id);
    axios
      .delete("http://localhost:3001/deleteContacts/" + contact_id)
      .then((res) => {
        if (res.data.Status === "Success") {
          // console.log('Delete product Successfully')
          // window.location.reload(true)
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            closeModals()
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateData = (e) => {
    e.preventDefault();
    console.log(selectedProduct);
    axios
      .put(
        "http://localhost:3001/updateContacts/" + selectedProduct.contact_id,
        selectedProduct
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          //console.log('Update Successful')
          setShowUpdateAlert(true);
          setTimeout(() => {
            setShowUpdateAlert(false);
            closeModals()
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
          Edit Suppliers Contact Information
        </ModalHeader>
        <ModalBody>
          {selectedProduct && (
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
                      value={selectedProduct.name}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
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
                      id="company_name"
                      name="company_name"
                      value={selectedProduct.company_name}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
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
                      value={selectedProduct.email}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
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
                      Mobile:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                      value={selectedProduct.mobile}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          mobile: e.target.value,
                        })
                      }
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="full_address" className="form-label">
                      Full Address:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="full_address"
                      name="full_address"
                      value={selectedProduct.full_address}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
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
                      value={selectedProduct.district}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          district: e.target.value,
                        })
                      }
                      required
                      autoComplete="off"
                    />
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
          Are you sure to delete the Contact?
        </ModalHeader>
        <ModalBody>
          {showAlert && (
            <Alert type="success" message="Data Deleted Successfully" />
          )}
           {selectedProduct && (
            <div className="d-flex justify-content-center" style={{marginTop: '4rem'}}>
              <button
                type="button"
                className="btn btn-outline-danger mr-4"
                onClick={() => handleDelete(selectedProduct.contact_id)}
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
        <h4>LIST OF ALL SUPPLIERS NUMBER</h4>
      </div>
      <div className="my-table">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Company Name</th>
              <th scope="col">Email </th>
              <th scope="col">Mobile</th>
              <th scope="col">Full Address</th>
              <th scope="col">District</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.name}</th>
                <td>{item.company_name}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>{item.full_address}</td>
                <td>{item.district}</td>
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

export default ContactSuppliers;
