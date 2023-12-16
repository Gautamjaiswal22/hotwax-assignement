const mysql = require('mysql');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '',
});

// Connect to the MySQL server
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');

    connection.query('CREATE DATABASE IF NOT EXISTS hotwax', (error, results) => {
        if (error) {
            console.error('Error creating database: ' + error.message);
        } else {
            if (results.warningCount === 0) {
                console.log('Database created successfully');
            } else {
                console.log('Database already exists');
            }
        }
    });
    connection.query('use hotwax', (error, results) => {
        if (error) {
            console.error('Error creating database: ' + error.message);
        } else {
            if (results.warningCount === 0) {
                console.log('Database created successfully');
            } else {
                console.log('Database using hotwax');
            }
        }
    });

    // Create Party table
    // Check if Party table exists
    connection.query('SHOW TABLES LIKE "Party"', (error, results) => {
        if (error) {
            console.error('Error checking if Party table exists: ' + error.message);
            return connection.end();
        }

        if (results.length === 0) {
            // Party table doesn't exist, create it
            connection.query(`
        CREATE TABLE Party (
          partyId INT AUTO_INCREMENT PRIMARY KEY,
          partyTypeEnumId INT,
          OrderPart VARCHAR(255)
        )
      `, (error, results) => {
                if (error) {
                    console.error('Error creating Party table: ' + error.message);
                } else {
                    console.log('Party table created successfully');
                    // Load sample data into Party table
                    loadPartyData();
                }
                // connection.end();
            });
        } else {
            console.log('Party table already exists, skipping data loading');
            // connection.end();
        }
    });

    // Function to load sample data into Party table
    function loadPartyData() {
        connection.query(`
      INSERT INTO Party (partyTypeEnumId, OrderPart) VALUES
      (1, 'OrderPart1'),
      (2, 'OrderPart2'),
      (1, 'OrderPart3')
    `, (error, results) => {
            if (error) {
                console.error('Error loading data into Party table: ' + error.message);
            } else {
                console.log('Data loaded into Party table successfully');
            }
        });
    }



    // Check if Product table exists
    connection.query('SHOW TABLES LIKE "Product"', (error, results) => {
        if (error) {
            console.error('Error checking if Product table exists: ' + error.message);
            return connection.end();
        }

        if (results.length === 0) {
            // Party table doesn't exist, create it
            connection.query(`
            CREATE TABLE IF NOT EXISTS Product (
                productId INT AUTO_INCREMENT PRIMARY KEY,
                ownerPartyId INT,
                productName VARCHAR(255),
                description TEXT,
                chargeShipping BOOLEAN,
                returnable BOOLEAN)
      `, (error, results) => {
                if (error) {
                    console.error('Error creating product table: ' + error.message);
                } else {
                    console.log('Product table created successfully');
                    // Load sample data into Party table
                    loadProductData();
                }
                // connection.end();
            });
        } else {
            console.log('Product table already exists, skipping data loading');
            // connection.end();
        }
    });

    // Function to load sample data into Party table


    function loadProductData() {

        connection.query(`
    INSERT INTO Product (ownerPartyId, productName, description, chargeShipping, returnable) VALUES
    (1, 'Product1', 'Description1', true, false),
    (2, 'Product2', 'Description2', false, true),
    (1, 'Product3', 'Description3', true, true)
  `, (error, results) => {
            if (error) {
                console.error('Error loading data into Product table: ' + error.message);
            } else {
                console.log('Data loaded into Product table successfully');
            }
            // Close the connection
            // connection.end();
        });
    }


    // creating table Person

    connection.query('SHOW TABLES LIKE "Person"', (error, results) => {
        if (error) {
            console.error('Error checking if Person table exists: ' + error.message);
            return connection.end();
        }

        if (results.length === 0) {
            // Person table doesn't exist, create it
            connection.query(`
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
                    console.error('Error creating Person table: ' + error.message);
                } else {
                    console.log('Person table created successfully');
                }
                connection.end();
            });
        } else {
            console.log('Person table already exists');
            connection.end();
        }
    });
});

module.exports = connection;