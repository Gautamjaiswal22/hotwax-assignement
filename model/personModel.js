const db = require('../config/db');

function createPersonTable() {
    db.query('SHOW TABLES LIKE "Person"', (error, results) => {
        if (error) {
            console.error('Error checking if Person table exists:', error.message);
            return;
        }

        if (results.length === 0) {
            // Person table doesn't exist, create it
            db.query(`
                CREATE TABLE Person (
                    partyId INT AUTO_INCREMENT PRIMARY KEY,
                    salutation VARCHAR(255),
                    firstName VARCHAR(255),
                    middleName VARCHAR(255),
                    lastName VARCHAR(255),
                    gender VARCHAR(10),
                    birthDate DATE,
                    occupation VARCHAR(255),
                    maritalStatusEnumId INT,
                    employmentStatusEnumId INT
                )
            `, (error, results) => {
                if (error) {
                    console.error('Error creating Person table:', error.message);
                } else {
                    console.log('Person table created successfully');
                }
            });
        } else {
            console.log('Person table already exists');
        }
    });
}

module.exports = {
    createPersonTable,
};
