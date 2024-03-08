import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

// Import the 'plus' icon
function Accounts() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const [accountsData, setAccountsData] = useState([]);
  const [totalPurchase, setTotalPurchase] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:3001/collectAccount")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAccountsData(res.data.result);
          console.log(res.data.result);
        } else {
          console.log(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/collectTotalPurchase")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.Result)
          setTotalPurchase(parseInt(res.data.Result));
        } else {
          console.log(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/collectTotalSale")
      .then((res) => {
        if (res.data.Status === "Success") {
          setTotalSales(parseInt(res.data.Result));
        } else {
          console.log(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const screenHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const screenWidth = window.innerWidth || document.documentElement.clientWidth;
  // State to manage modal visibility and form data
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    account_name: "",
    short_description: "",
    account_type: "",
    account_number: "",
    initial_balance: "",
    net_balance: "",
  });

  // Function to open the modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/addAccount", formData)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Successfully Inserted Data");
          setFormData({
            ...formData,
            account_name: "",
            short_description: "",
            account_type: "",
            account_number: "",
            initial_balance: "",
            net_balance: "",
          });
        } else {
          console.log(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    closeModal();
  };
  return (
    <div style={{ background: "#eef1f4" }}>
      {/* Page heading */}
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <h5
          style={{ marginRight: "10px", marginTop: "10px", marginLeft: "10px" }}
        >
          Accounts
        </h5>
        <p style={{ marginTop: "15px" }}>Manage your Accounts</p>
      </div>

      <div
        style={{
          backgroundColor: "white",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div>
            <h5 style={{ marginTop: "8px" }}>All your Accounts</h5>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <span>Show</span>
              <select style={{ margin: "0 8px", width: "70px" }}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                {/* Add more options as needed */}
              </select>
              <span>entries</span>
            </div>
          </div>
          <div>
            {/* Row 1: Add Button */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              <button style={{ width: "60px" }} onClick={openModal}>
                <i className="fa fa-plus-square" aria-hidden="true"></i> Add
              </button>
            </div>

            {/* Row 2: Search Button and Input */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <button style={{ marginRight: "10px", width: "60px" }}>
                Search
              </button>
              <input type="text" placeholder="Search..." />
            </div>
          </div>
        </div>

        {/* Table content */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Account Name</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Total Purchase</th>
              <th style={tableHeaderStyle}>Total Sell</th>
              <th style={tableHeaderStyle}>Net Balance</th>
              <th style={tableHeaderStyle}>Current Balance</th>
              <th style={tableHeaderStyle}>Account Number</th>
              <th style={tableHeaderStyle}>Type</th>
            </tr>
          </thead>
          <tbody>
            {accountsData.map((account, index) => (
              <tr
                key={index}
                style={{
                  background:
                    account.account_id % 2 === 0 ? "#f2f2f2" : "white",
                }}
              >
                <td style={tableCellStyle}>{account.account_name}</td>
                <td style={tableCellStyle}>{account.short_description}</td>
                <td style={tableCellStyle}>{totalPurchase}</td>
                <td style={tableCellStyle}>{totalSales}</td>
                <td style={tableCellStyle}>{totalSales-totalPurchase}</td>
                <td style={tableCellStyle}>{account.initial_balance + (totalSales-totalPurchase)}</td>
                <td style={tableCellStyle}>{account.account_number}</td>
                <td style={tableCellStyle}>{account.account_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding an account */}
      <div
        style={{
          display: isModalOpen ? "block" : "none",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          backgroundColor: "white",
          zIndex: "1000",
          height: `${screenHeight * 0.75}px`,
          width: `${screenWidth * 0.35}px`,
          textAlign: "left",
          fontSize: "14px",
          borderRadius: "10px",
        }}
      >
        <h5 style={{ marginBottom: `${screenHeight * 0.67 * 0.04}px` }}>
          Add Account
        </h5>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: `${screenHeight * 0.67 * 0.03}px`,
          }}
        >
          <label style={{ fontWeight: "bold" }}>Account Name</label>
          <input
            style={{ height: `${screenHeight * 0.67 * 0.06}px` }}
            type="text"
            name="accountName"
            value={formData.accountName}
            placeholder="Account Name"
            onChange={(e) =>
              setFormData({ ...formData, account_name: e.target.value })
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: `${screenHeight * 0.67 * 0.03}px`,
          }}
        >
          <label style={{ fontWeight: "bold" }}>Short Description</label>
          <input
            style={{ height: `${screenHeight * 0.67 * 0.06}px` }}
            type="text"
            name="description"
            value={formData.description}
            placeholder="Short Description"
            onChange={(e) =>
              setFormData({ ...formData, short_description: e.target.value })
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: `${screenHeight * 0.67 * 0.03}px`,
          }}
        >
          <label style={{ fontWeight: "bold" }}>Type</label>
          <input
            style={{ height: `${screenHeight * 0.67 * 0.06}px` }}
            type="text"
            name="type"
            value={formData.account_type}
            placeholder="Type"
            onChange={(e) =>
              setFormData({ ...formData, account_type: e.target.value })
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: `${screenHeight * 0.67 * 0.03}px`,
          }}
        >
          <label style={{ fontWeight: "bold" }}>Account Number</label>
          <input
            style={{ height: `${screenHeight * 0.67 * 0.06}px` }}
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            placeholder="Account Number"
            onChange={(e) =>
              setFormData({ ...formData, account_number: e.target.value })
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: `${screenHeight * 0.67 * 0.05}px`,
          }}
        >
          <label style={{ fontWeight: "bold" }}>Initial Balance</label>
          <input
            style={{ height: `${screenHeight * 0.67 * 0.06}px` }}
            type="text"
            name="initialBalance"
            value={formData.initialBalance}
            placeholder="Initial Balance"
            onChange={(e) =>
              setFormData({ ...formData, initial_balance: e.target.value })
            }
          />
        </div>
        <div style={{ textAlign: "right" }}>
          <button
            className="btn btn-success"
            style={{ marginRight: "10px" }}
            onClick={handleSave}
          >
            Save
          </button>
          <button className="btn btn-danger" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>

      {/* Background overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: isModalOpen ? "block" : "none",
        }}
        onClick={closeModal}
      ></div>
    </div>
  );
}

// Define styles for table header and cell
const tableHeaderStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  background: "#f4f4f4",
};

const tableCellStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

export default Accounts;
