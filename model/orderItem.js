const db = require('../config/db');

// Function to create OrderItem table
function createOrderItemTable() {
    db.query('SHOW TABLES LIKE "orderItem"', (error, results) => {
        if (error) {
            console.error('Error checking if OrderItem table exists:', error.message);
            return;
        }

        if (results.length === 0) {
            // OrderItem table doesn't exist, create it
            db.query(`
            CREATE TABLE orderItem (
                orderItemSeqId INT AUTO_INCREMENT PRIMARY KEY,
                orderId VARCHAR(40),
                orderPartSeqId INT,
                productId VARCHAR(40),
                itemDescription VARCHAR(255),
                quantity INT,
                itemTypeEnumId VARCHAR(40),
                unitAmount DECIMAL(24,4),
                parentItemSeqId INT,
                FOREIGN KEY (orderId) REFERENCES order_part(ORDER_ID)
            )  
            `, (error, results) => {
                if (error) {
                    console.error('Error creating OrderItem table:', error.message);
                } else {
                    console.log('OrderItem table created successfully');
                }
            });
        } else {
            console.log('OrderItem table already exists');
        }
    });
}

module.exports = {
    createOrderItemTable,
};
