import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ListPurchases.css";

function StockReport() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [purchasesData, setPurchasesData] = useState(null);

  useEffect(() => {
    if (startDate && endDate) {
      axios.get(`http://localhost:3001/totalSales?fromDate=${startDate}&toDate=${endDate}`)
        .then((res) => {
          setSalesData(res.data.salesData);
        })
        .catch((err) => {
          console.log(err);
        });

      axios.get(`http://localhost:3001/totalPurchases?fromDate=${startDate}&toDate=${endDate}`)
        .then((res) => {
          setPurchasesData(res.data.purchasesData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [startDate, endDate]);

  const calculateAmount = (item) => {
    if (salesData && purchasesData) {
      const purchased = purchasesData[item] || 0;
      const sold = salesData[item] || 0;
      return purchased - sold;
    }
    return 0;
  };

  const calculateComment = (item) => {
    const amount = calculateAmount(item);
    if (amount > 0) return "Stock Increased";
    else if (amount < 0) return "Stock Decreased";
    else return "Stock Unchanged";
  };

  const totalRow = () => {
    let totalPurchased = 0;
    let totalSold = 0;

    if (salesData && purchasesData) {
      Object.values(purchasesData).forEach((val) => (totalPurchased += val));
      Object.values(salesData).forEach((val) => (totalSold += val));
    }

    const totalAmount = totalPurchased - totalSold;
    const totalComment = totalAmount > 0 ? "Stock Increased" : totalAmount < 0 ? "Stock Decreased" : "Stock Unchanged";

    return (
      <tr className="total-row">
        <th>Total</th>
        <td>{totalPurchased}</td>
        <td>{totalSold}</td>
        <td>{totalAmount}</td>
        <td>{totalComment}</td>
      </tr>
    );
  };

  return (
    <div>
      <div className="search-bar">
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: "25px",
            fontWeight: "3px",
            padding: 10,
          }}
        >
          Stock Tracking :
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
        </div>
      </div>

      {salesData && purchasesData && (
        <div className="purchase-table">
          <table className="table table-striped">
            <thead className="table-head">
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Total Purchased</th>
                <th scope="col">Total Sold</th>
                <th scope="col">Changed Stock</th>
                <th scope="col">Comment</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(salesData).map((item, index) => (
                <tr key={index}>
                  <td>{item}</td>
                  <td>{purchasesData[item] || 0}</td>
                  <td>{salesData[item] || 0}</td>
                  <td>{calculateAmount(item)}</td>
                  <td>{calculateComment(item)}</td>
                </tr>
              ))}
              {totalRow()}
            </tbody>
          </table>
        </div>
      )}

      <div className="pad"> </div>
    </div>
  );
}

export default StockReport;
