import React, { useEffect, useState } from "react";
import "./Report.css"; // Import the CSS file

function Sells_Report() {
  const [salesData, setSalesData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8081/sales?from=${fromDate}&to=${toDate}&customer=${customerName}`)
      .then((res) => res.json())
      .then((salesData) => setSalesData(salesData))
      .catch((err) => console.log(err));
  }, [fromDate, toDate, customerName]);

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  return (
    <div>
      <h3>Sales Report</h3>
      <div className="filters">
        <label>From Date:</label>
        <input type="date" value={fromDate} onChange={handleFromDateChange} />
        <label>To Date:</label>
        <input type="date" value={toDate} onChange={handleToDateChange} />
        <label>Customer Name:</label>
        <input type="text" className="customerName" value={customerName} onChange={handleCustomerNameChange} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Location</th>
            <th>Delivery Date</th>
            <th>Refill 5.5kg</th>
            <th>Cylinder 5.5kg</th>
            <th>Refill 12kg</th>
            <th>Cylinder 12kg</th>
            <th>Refill 25kg</th>
            <th>Cylinder 25kg</th>
            <th>Refill 35kg</th>
            <th>Cylinder 35kg</th>
            <th>Refill 45kg</th>
            <th>Cylinder 45kg</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((d, i) => (
            <tr key={i}>
              <td>{d.date}</td>
              <td>{d.customer_name}</td>
              <td>{d.location}</td>
              <td>{d.delivery_date}</td>
              <td>{d.gas_5_5}</td>
              <td>{d.cyl_5_5}</td>
              <td>{d.gas_12}</td>
              <td>{d.cyl_12}</td>
              <td>{d.gas_25}</td>
              <td>{d.cyl_25}</td>
              <td>{d.gas_35}</td>
              <td>{d.cyl_35}</td>
              <td>{d.gas_45}</td>
              <td>{d.cyl_45}</td>
              <td>{d.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sells_Report;
