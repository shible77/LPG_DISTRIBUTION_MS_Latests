import React, { useEffect, useState, useRef } from "react";
import "./AddPurchases.css";
import axios from "axios";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";

function PurchaseForm() {
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve authentication status from localStorage
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);
  const [showAlert, setShowAlert] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    customerName: "",
    sale_date: "",
    delivery_date:"",
    location: "",
    selected_products: [],
    net_amount: 0,
  });
  const [options, setOptions] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getProduct")
      .then((res) => {
        if (res.data.Status === "Success") {
          setOptions(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const [inputValue, setInputValue] = useState([]);

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    // setSelectedOption(selectedValue);
    const object = JSON.parse(selectedValue);

    const existingProduct = inputValue.find(
      (item) => item.product_id === object.product_id
    );
    if (existingProduct) {
      return;
    } else {
      setTableData((prevData) => [...prevData, { ...object, quantity: 1 }]);
      setInputValue((prevArray) => [...prevArray, object]);
    }
  };

  const [purchaseQuantities, setPurchaseQuantities] = useState({});
  const [total, setTotal] = useState({});

  const handleQuantityChange = (productId, quantity, unit) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      )
    );

    setPurchaseQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
    const lineTotal = parseInt(quantity) * unit;

    setTotal((prevTotal) => ({
      ...prevTotal,
      [productId]: lineTotal,
    }));
  };

  const handleDelete = (event, productId) => {
    event.preventDefault();

    setTableData((prevData) =>
      prevData.filter((item) => item.product_id !== productId)
    );

    const updatedInputValue = inputValue.filter(
      (item) => item.product_id !== productId
    );
    const { [productId]: deletedQuantity, ...updatedPurchaseQuantities } =
      purchaseQuantities;
    const { [productId]: deletedTotal, ...updatedTotal } = total;

    setInputValue(updatedInputValue);
    setPurchaseQuantities(updatedPurchaseQuantities);
    setTotal(updatedTotal);
  };

  const calculateNetTotal = () => {
    let netTotal = 0;

    for (const productId in total) {
      if (total.hasOwnProperty(productId)) {
        netTotal += total[productId];
      }
    }
    return netTotal;
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (inputValue.length === 0) {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 3000);
    }
    const amount = inputRef.current.value;
    const updatedFormData = {
      ...formData,
      net_amount: amount,
      selected_products: tableData,
    };
    setFormData(updatedFormData);
    axios
      .post("http://localhost:3001/addSale", updatedFormData)
      .then((res) => {
        if (res.data.Status === "Success") {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
          setTimeout(() => {
            window.location.reload();
          }, 3500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="outer_div">
      <h3>Add Sale</h3>
      <form className="purchase-form">
        <div className="outer_form">
          <div className="row">
            <div className="col">
              <label htmlFor="supplier">Customer Name:</label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({ ...formData, customerName: e.target.value })
                }
              />    
            </div>

            <div className="col">
              <label htmlFor="purchaseDate">Sale Date:</label>
              <input
                type="date"
                id="purchaseDate"
                value={formData.sale_date}
                onChange={(e) =>
                  setFormData({ ...formData, sale_date: e.target.value })
                }
              />
            </div>
            <div className="col">
              <label htmlFor="purchaseDate">Delivery Date:</label>
              <input
                type="date"
                id="purchaseDate"
                value={formData.delivery_date}
                onChange={(e) =>
                  setFormData({ ...formData, delivery_date: e.target.value })
                }
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="businessLocation">Location:</label>
              <select
                id="businessLocation"
                name="businessLocation"
                value={formData.location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Please Select
                </option>
                <option value="Chittagong">Chittagong</option>
              </select>
            </div>
          </div>
        </div>

        <div className="inner_form">
          <div className="row">
            <div className="col">
              <label htmlFor="selectProduct">Select Product:</label>
              <select
                id="selectProduct"
                name="selectProduct"
                value=""
                onChange={handleOptionChange}
              >
                <option value="" disabled>
                  Select Product:
                </option>
                {options.map((item, index) => (
                  <option
                    key={index}
                    value={JSON.stringify(item)}
                  >{`${item.product_name}`}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="table-container">
            <table className="table table-striped">
              <thead className="table-head">
                <tr>
                  <th>Serial No</th>
                  <th>Product Name</th>
                  <th>Sale Quantity</th>
                  <th>Unit Price</th>
                  <th>Line Total</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {inputValue.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.product_name}</td>
                    <td>
                      <input
                        type="text"
                        value={purchaseQuantities[item.product_id] || ""}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.product_id,
                            e.target.value,
                            item.selling_price
                          )
                        }
                      />
                    </td>
                    <td>{item.selling_price}</td>
                    <td>{total[item.product_id]}</td>
                    <td>
                      <button
                        onClick={(e) => handleDelete(e, item.product_id)}
                        className="btn btn-outline-danger"
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="row_net"
          >
            <label
              style={{
                flex: "1",
                textAlign: "right",
                marginRight: "10px",
                marginLeft: "500px",
              }}
              htmlFor="netAmount"
            >
              Net Total Amount:
            </label>
            <input
              style={{ flex: "2" }}
              type="number"
              id="netAmount"
              name="netAmount"
              value={calculateNetTotal()}
              onChange={(e) => {}}
              ref={inputRef}
            />
          </div>
          {showAlert && (
            <Alert
              type="success"
              message="Sale Data Inserted Successfully"
            />
          )}
          {showWarning && (
            <Alert type="warning" message={`You didn't select any product`} />
          )}
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleClick}
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}

export default PurchaseForm;
