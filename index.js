const app = require('./app');
const db = require('./config/db');


// const db = require('./db');
const partyModel = require('./model/partyModel');
const productModel = require('./model/productModel');
const personModel = require('./model/personModel');
const orderModel = require('./model/orderModel');
const orderHeaderModel = require('./model/order_headerModel.js');

// Create and load tables
db.query('CREATE DATABASE IF NOT EXISTS hotwax', (error, results) => {
    if (error) {
        console.error('Error creating database:', error.message);
        // Handle the error appropriately
        // connection.end();
    }

    console.log(results.warningCount === 0 ? 'Database created successfully' : 'Database already exists');

    db.query('USE hotwax', (error, results) => {
        if (error) {
            console.error('Error selecting database:', error.message);
            // Handle the error appropriately
            // connection.end();
        }

        console.log('Database using hotwax');

        // Create Party table
        partyModel.createPartyTable();

        // Create Product table
        productModel.createProductTable();

        // Create Person table
        personModel.createPersonTable();

        // Create Order table
        orderModel.createOrderTable();
        orderHeaderModel.createOrderHeaderTable();
    });
});


const port = 5000;

app.get('/', (req, res) => {
    res.send("HELLO HOTWAX");
});
app.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`);
});