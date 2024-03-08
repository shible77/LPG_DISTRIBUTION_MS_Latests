import React, { useEffect, useState } from "react";
import "./Report.css"; // Import the CSS file

function Purchase_Report() {
  const [purchaseData, setPurchaseData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [supplierName, setSupplierName] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8081/purchases?from=${fromDate}&to=${toDate}&supplier=${supplierName}`)
      .then((res) => res.json())
      .then((purchaseData) => setPurchaseData(purchaseData))
      .catch((err) => console.log(err));
  }, [fromDate, toDate, supplierName]);

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleCustomerNameChange = (event) => {
    setSupplierName(event.target.value);
  };

  return (
    <div>
      <h3>Purchase Report</h3>
      <div className="filters">
        <label>From Date:</label>
        <input type="date" value={fromDate} onChange={handleFromDateChange} />
        <label>To Date:</label>
        <input type="date" value={toDate} onChange={handleToDateChange} />
        <label>Supplier Name:</label>
        <input type="text" className="customerName" value={supplierName} onChange={handleCustomerNameChange} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Supplier</th>
            <th>Status</th>
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
          {purchaseData.map((d, i) => (
            <tr key={i}>
              <td>{d.date}</td>
              <td>{d.location}</td>
              <td>{d.supplier}</td>
              <td>{d.status}</td>
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

export default Purchase_Report;
