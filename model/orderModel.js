const db = require('../config/db');

function createOrderTable() {
    try {
        // Check if the Order table exists
        db.query('SHOW TABLES LIKE "Order"', (error, results) => {
            if (error) {
                console.error('Error checking if Order table exists:', error.message);
                // Close the connection pool or handle the error appropriately
                // connection.end();
            }

            if (results.length === 0) {
                // Order table doesn't exist, create it
                db.query(`
                    CREATE TABLE \`Order\` (
                        orderId INT AUTO_INCREMENT PRIMARY KEY,
                        orderName VARCHAR(255) NOT NULL,
                        currencyUomId VARCHAR(10) DEFAULT 'USD',
                        salesChannelEnumId VARCHAR(20),
                        statusId VARCHAR(20) DEFAULT 'OrderPlaced',
                        productStoreId VARCHAR(50),
                        placedDate DATE NOT NULL,
                        approvedDate DATE,
                        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                    )
                `, (error, results) => {
                    if (error) {
                        console.error('Error creating Order table:', error.message);
                    } else {
                        console.log('Order table created successfully');
                    }
                    // Close the connection pool
                    // connection.end();
                });
            } else {
                console.log('Order table already exists');
                // Close the connection pool
                // connection.end();
            }
        });
    } catch (error) {
        console.error('Error creating Order table:', error.message);
    }
}

module.exports = {
    createOrderTable,
};
