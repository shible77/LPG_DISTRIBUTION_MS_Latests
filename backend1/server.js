const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host : "localhost",
    user : 'root',
    password : '',
    database : 'lpg_distribution'
})

app.get('/', (req, res)=>{
    return res.json("From Backend Side");
})

app.get('/sales', (req, res) => {
    let startDate = req.query.from;
    let endDate = req.query.to;
    let customerName = req.query.customer;
    
    let sql = "SELECT * FROM sales WHERE 1=1"; // Adding WHERE 1=1 for dynamic query construction
    
    if (startDate && endDate) {
        sql += ` AND date BETWEEN '${startDate}' AND '${endDate}'`;
    }
    
    if (customerName) {
        sql += ` AND customer_name LIKE '%${customerName}%'`; // Assuming partial match on customer name
    }

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/purchases', (req, res) => {
    let startDate = req.query.from;
    let endDate = req.query.to;
    let supplierName = req.query.supplier;
    
    let sql = "SELECT * FROM purchases WHERE 1=1"; // Adding WHERE 1=1 for dynamic query construction
    
    if (startDate && endDate) {
        sql += ` AND date BETWEEN '${startDate}' AND '${endDate}'`;
    }
    
    if (supplierName) {
        sql += ` AND supplier LIKE '%${supplierName}%'`; // Assuming partial match on supplier name
    }

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/sales_summary', (req, res) => {
    let customerName = req.query.customer;
    
    let sql = "SELECT customer_name, SUM(total) as total, SUM(gas_5_5) as gas_5_5,SUM(cyl_5_5) as cyl_5_5,SUM(gas_12) as gas_12,SUM(cyl_12) as cyl_12,SUM(cyl_12) as cyl_12,SUM(gas_25) as gas_25,SUM(cyl_25) as cyl_25,SUM(gas_35) as gas_35,SUM(cyl_35) as cyl_35,SUM(gas_45) as gas_45,SUM(cyl_45) as cyl_45 FROM sales WHERE 1=1"; // Adding WHERE 1=1 for dynamic query construction
    
    if (customerName) {
        sql += ` AND customer_name LIKE '%${customerName}%'`; // Assuming partial match on customer name
    }

    sql += ` GROUP BY customer_name`;

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/purchases_summary', (req, res) => {
    let supplierName = req.query.supplier;
    
    let sql = "SELECT supplier, SUM(total) as total, SUM(gas_5_5) as gas_5_5,SUM(cyl_5_5) as cyl_5_5,SUM(gas_12) as gas_12,SUM(cyl_12) as cyl_12,SUM(cyl_12) as cyl_12,SUM(gas_25) as gas_25,SUM(cyl_25) as cyl_25,SUM(gas_35) as gas_35,SUM(cyl_35) as cyl_35,SUM(gas_45) as gas_45,SUM(cyl_45) as cyl_45 FROM purchases WHERE 1=1"; // Adding WHERE 1=1 for dynamic query construction
    
    if (supplierName) {
        sql += ` AND supplier LIKE '%${supplierName}%'`; // Assuming partial match on customer name
    }

    sql += ` GROUP BY supplier`;

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


app.listen(8081, ()=>{
    console.log("listening");
})