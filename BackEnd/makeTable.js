const mysql  = require('mysql');


const db = mysql.createConnection({
    host : 'localhost',
    user : 'Tony',
    password : '--',
    database : 'Projects_Database'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected to the Projects_Database');
});

const sql = ` CREATE TABLE IF NOT EXISTS Projects_Database.Clothes_Cart (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    brand VARCHAR(255),
    store VARCHAR(255) NOT NULL,
    size VARCHAR(20) NOT NULL,
    picture VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (id)
);
`

db.query(sql, (err, data) => {
    if (err) {
        console.log('not able to make the table');
        return 'ERROR IN MAKING THE TABLE';
    }
    console.log('table made!!')
    return 'Successfully made the table';
})



