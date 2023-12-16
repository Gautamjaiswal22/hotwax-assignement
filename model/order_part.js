const db = require('../config/db');

function createOrderPartTable() {
    db.query('SHOW TABLES LIKE "order_part"', (error, results) => {
        if (error) {
            console.error('Error checking if order_part table exists:', error.message);
            return;
        }

        if (results.length === 0) {
            // order_part table doesn't exist, create it
            db.query(`
                CREATE TABLE order_part (
                    ORDER_ID VARCHAR(40) NOT NULL,
                    ORDER_PART_SEQ_ID VARCHAR(40) NOT NULL,
                    PART_NAME VARCHAR(255) DEFAULT NULL,
                    STATUS_ID VARCHAR(40) DEFAULT NULL,
                    VENDOR_PARTY_ID VARCHAR(40) DEFAULT NULL,
                    CUSTOMER_PARTY_ID VARCHAR(40) DEFAULT NULL,
                    PART_TOTAL DECIMAL(24,4) DEFAULT NULL,
                    FACILITY_ID VARCHAR(40) DEFAULT NULL,
                    SHIPMENT_METHOD_ENUM_ID VARCHAR(40) DEFAULT NULL,
                    PRIMARY KEY (ORDER_ID, ORDER_PART_SEQ_ID),
                    FOREIGN KEY (ORDER_ID) REFERENCES order_header(ORDER_ID),
                    FOREIGN KEY (CUSTOMER_PARTY_ID) REFERENCES party(PARTY_ID)
                )
            `, (error, results) => {
                if (error) {
                    console.error('Error creating order_part table:', error.message);
                } else {
                    console.log('order_part table created successfully');
                    // Load sample data into order_part table
                    loadOrderPartData();
                }
            });
        } else {
            console.log('order_part table already exists, skipping data loading');
        }
    });
}

function loadOrderPartData() {
    db.query(`
        INSERT INTO order_part (ORDER_ID, ORDER_PART_SEQ_ID, PART_NAME, STATUS_ID, VENDOR_PARTY_ID, CUSTOMER_PARTY_ID, PART_TOTAL, FACILITY_ID, SHIPMENT_METHOD_ENUM_ID) VALUES
        ('1', 'seq1', 'Part 1', 'OrderPlaced', 'vendor1', 'customer1', 50.00, 'Facility1', 'Air'),
        ('1', 'seq2', 'Part 2', 'OrderShipped', 'vendor2', 'customer2', 75.00, 'Facility2', 'Sea')
    `, (error, results) => {
        if (error) {
            console.error('Error loading data into order_part table:', error.message);
        } else {
            console.log('Data loaded into order_part table successfully');
        }
    });
}

module.exports = {
    createOrderPartTable,
};
