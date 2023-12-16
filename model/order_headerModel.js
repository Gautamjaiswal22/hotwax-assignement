const db = require('../config/db');

function createOrderHeaderTable() {
    db.query('SHOW TABLES LIKE "order_header"', (error, results) => {
        if (error) {
            console.error('Error checking if order_header table exists:', error.message);
            return;
        }

        if (results.length === 0) {
            // order_header table doesn't exist, create it
            db.query(`
                CREATE TABLE order_header (
                    ORDER_ID VARCHAR(40) PRIMARY KEY NOT NULL,
                    ORDER_NAME VARCHAR(255) DEFAULT NULL,
                    PLACED_DATE DATETIME DEFAULT NULL,
                    APPROVED_DATE DATETIME DEFAULT NULL,
                    STATUS_ID VARCHAR(40) DEFAULT NULL,
                    CURRENCY_UOM_ID VARCHAR(40) DEFAULT NULL,
                    PRODUCT_STORE_ID VARCHAR(40) DEFAULT NULL,
                    SALES_CHANNEL_ENUM_ID VARCHAR(40) DEFAULT NULL,
                    GRAND_TOTAL DECIMAL(24,4) DEFAULT NULL,
                    COMPLETED_DATE DATETIME DEFAULT NULL
                )
            `, (error, results) => {
                if (error) {
                    console.error('Error creating order_header table:', error.message);
                } else {
                    console.log('order_header table created successfully');
                    // Load sample data into order_header table
                    loadOrderHeaderData();
                }
            });
        } else {
            console.log('order_header table already exists, skipping data loading');
        }
    });
}

function loadOrderHeaderData() {
    db.query(`
        INSERT INTO order_header (ORDER_ID, ORDER_NAME, PLACED_DATE, APPROVED_DATE, STATUS_ID, CURRENCY_UOM_ID, PRODUCT_STORE_ID, SALES_CHANNEL_ENUM_ID, GRAND_TOTAL, COMPLETED_DATE) VALUES
        ('1', 'Test Order 1', '2020-04-17', '2020-04-19', 'OrderPlaced', 'USD', 'OMS_DEFAULT_STORE', 'ScWeb', 100.00, '2020-04-20'),
        ('2', 'Test Order 2', '2020-04-18', '2020-04-20', 'OrderApproved', 'EUR', 'OMS_STORE', 'ScMobile', 150.00, '2020-04-22')
    `, (error, results) => {
        if (error) {
            console.error('Error loading data into order_header table:', error.message);
        } else {
            console.log('Data loaded into order_header table successfully');
        }
    });
}

module.exports = {
    createOrderHeaderTable,
};
