import React, { useEffect, useState } from "react";
import "./Summary_Report.css"; // Import the CSS file

function Sells_Summary_Report() {
  const [salesData, setSalesData] = useState([]);
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8081/sales_summary?customer=${customerName}`)
      .then((res) => res.json())
      .then((salesData) => setSalesData(salesData))
      .catch((err) => console.log(err));
  }, [customerName]);

  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  return (
    <div>
      <h3>Sales Summary Report</h3>
      <div className="filters">
        <label>Customer Name:</label>
        <input type="text" className="customerName" value={customerName} onChange={handleCustomerNameChange} />
      </div>
      <div className="totalSells">
        <h5>Total Sells</h5>
      </div>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((d, i) => (
            <tr key={i}>
              <td>{d.customer_name}</td>
              <td>{d.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="summarySells">
        <h5 className="">Sells Details</h5>
      </div>
      <table className="lowTable">
        <thead>
          <tr>
            <th>Customer Name</th>
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
          </tr>
        </thead>
        <tbody>
          {salesData.map((b, j) => (
            <tr key={j}>
              <td>{b.customer_name}</td>
              <td>{b.gas_5_5*650}</td>
              <td>{b.cyl_5_5*850}</td>
              <td>{b.gas_12*1250}</td>
              <td>{b.cyl_12*1450}</td>
              <td>{b.gas_25*1550}</td>
              <td>{b.cyl_25*1750}</td>
              <td>{b.gas_35*2050}</td>
              <td>{b.cyl_35*2250}</td>
              <td>{b.gas_45*2550}</td>
              <td>{b.cyl_45*2750}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sells_Summary_Report;

