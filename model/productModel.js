const db = require('../config/db');

function createProductTable() {
    db.query('SHOW TABLES LIKE "Product"', (error, results) => {
        if (error) {
            console.error('Error checking if Product table exists:', error.message);
            return;
        }

        if (results.length === 0) {
            // Product table doesn't exist, create it
            db.query(`
                CREATE TABLE IF NOT EXISTS Product (
                    productId INT AUTO_INCREMENT PRIMARY KEY,
                    ownerPartyId INT,
                    productName VARCHAR(255),
                    description TEXT,
                    chargeShipping BOOLEAN,
                    returnable BOOLEAN
                )
            `, (error, results) => {
                if (error) {
                    console.error('Error creating Product table:', error.message);
                } else {
                    console.log('Product table created successfully');
                    // Load sample data into Product table
                    loadProductData();
                }
            });
        } else {
            console.log('Product table already exists, skipping data loading');
        }
    });
}

function loadProductData() {
    db.query(`
        INSERT INTO Product (ownerPartyId, productName, description, chargeShipping, returnable) VALUES
        (1, 'Product1', 'Description1', true, false),
        (2, 'Product2', 'Description2', false, true),
        (1, 'Product3', 'Description3', true, true)
    `, (error, results) => {
        if (error) {
            console.error('Error loading data into Product table:', error.message);
        } else {
            console.log('Data loaded into Product table successfully');
        }
    });
}

module.exports = {
    createProductTable,
};
