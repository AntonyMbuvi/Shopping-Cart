const express = require('express');
const mysql  = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host : 'localhost',
    user : 'Tony',
    password : '--',
    database : 'Projects_Database'
});

app.get('/allclothes', (req, res) => {
    const sql = 'Select * From Clothes_Cart';
    db.query(sql, (err, data) => {
        if (err) {
            console.log('There was an error in inserting data into the Clothes_Cart table', err);
            return res.status(500).json({ error: 'An error occurred while inserting data into the database' });
        }
        console.log('returned clothes from the database')
        console.log(data)
        return res.json(data);
    })
})
app.post('/addClothing', (req, res) => {
    const sql = 'INSERT INTO Clothes_Cart (`name`, `category`, `brand`, `store`, `size`, `picture`, `price`) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [req.body.name, req.body.category, req.body.brand, req.body.store, req.body.size, req.body.picture, req.body.price];
    
    db.query(sql, values, (err, data) => {
        if (err) {
            console.log('There was an error in inserting data into the Clothes_Cart table', err);
            return res.status(500).json({ error: 'An error occurred while inserting data into the database' });
        }
        console.log('Data inserted into Clothes_Cart successfully');
        res.json(data);
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 8800');
});