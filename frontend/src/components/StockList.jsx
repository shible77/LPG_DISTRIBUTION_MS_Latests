import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ListPurchases.css";
import { useNavigate } from "react-router-dom";

function StockList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      navigate("/");
    } else {
    axios
        .get("http://localhost:3001/stock") 
        .then((res) => {
          if (res.data.Status === "Success") {
            setData(res.data.stock);
          } else {
            console.error("Error fetching stock:", res.data.Error);
          }
        })
        .catch((err) => {
          console.error("Error fetching stock:", err);
        });
    }
   }, [navigate]);
   

  return (
    <div>
      <div className="title">
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: "25px",
            fontWeight: "3px",
            marginTop: "10px"
          }}
        >
          LIST OF ALL Stock
        </p>
      </div>
      <div className="purchase-table">
        <table className="table table-striped">
          <thead className="table-head">
            <tr>        
              <th scope="col">5.5 Kg</th>
              <th scope="col">12 Kg</th>
              <th scope="col">25 Kg</th>
              <th scope="col">35 Kg</th>
              <th scope="col">45 Kg</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.kg_5_5}</td>
                <td>{item.kg_12}</td>
                <td>{item.kg_25}</td>
                <td>{item.kg_35}</td>
                <td>{item.kg_45}</td>
                <td>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pad"> </div>
    </div>
  );
}

export default StockList;
//comment