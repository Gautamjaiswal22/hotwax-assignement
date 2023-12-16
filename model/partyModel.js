const db = require('../config/db');

function createPartyTable() {
    db.query('SHOW TABLES LIKE "Party"', (error, results) => {
        if (error) {
            console.error('Error checking if Party table exists:', error.message);
            return;
        }

        if (results.length === 0) {
            // Party table doesn't exist, create it
            db.query(`
                CREATE TABLE Party (
                    partyId INT AUTO_INCREMENT PRIMARY KEY,
                    partyTypeEnumId INT,
                    OrderPart VARCHAR(255)
                )
            `, (error, results) => {
                if (error) {
                    console.error('Error creating Party table:', error.message);
                } else {
                    console.log('Party table created successfully');
                    // Load sample data into Party table
                    loadPartyData();
                }
            });
        } else {
            console.log('Party table already exists, skipping data loading');
        }
    });
}

function loadPartyData() {
    db.query(`
        INSERT INTO Party (partyTypeEnumId, OrderPart) VALUES
        (1, 'OrderPart1'),
        (2, 'OrderPart2'),
        (1, 'OrderPart3')
    `, (error, results) => {
        if (error) {
            console.error('Error loading data into Party table:', error.message);
        } else {
            console.log('Data loaded into Party table successfully');
        }
    });
}

module.exports = {
    createPartyTable,
};
