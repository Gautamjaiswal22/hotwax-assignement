// controllers/personController.js

const db = require('../config/db');

exports.welcome = async (req, res) => {
    console.log("inserting person");
    try {

        res.status(201).json({ success: true, message: 'Person inserted successfully', });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


exports.insertPerson = async (req, res) => {
    console.log("inserting person");
    const { salutation, firstName, middleName, lastName, gender, birthDate, occupation, maritalStatusEnumId, employmentStatusEnumId } = req.body;
    try {
        // Insert a new person into the Person table
        const insertQuery = `
      INSERT INTO Person 
        (salutation, firstName, middleName, lastName, gender, birthDate, occupation, maritalStatusEnumId, employmentStatusEnumId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        const values = [salutation, firstName, middleName, lastName, gender, birthDate, occupation, maritalStatusEnumId, employmentStatusEnumId];

        db.query(insertQuery, values, (error, results) => {
            if (error) {
                console.error('Error inserting person: ' + error.message);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }

            console.log('Person inserted successfully');
            res.status(201).json({ success: true, message: 'Person inserted successfully', insertedId: results.insertId });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};



exports.updatePerson = async (req, res) => {
    console.log("updating person");

    const { partyId, salutation, firstName, middleName, lastName, gender, birthDate, occupation, maritalStatusEnumId, employmentStatusEnumId } = req.body;

    try {
        // Construct the dynamic part of the update query
        const updateFields = [];
        const values = [];

        if (salutation !== undefined) {
            updateFields.push('salutation = ?');
            values.push(salutation);
        }

        if (firstName !== undefined) {
            updateFields.push('firstName = ?');
            values.push(firstName);
        }

        if (middleName !== undefined) {
            updateFields.push('middleName = ?');
            values.push(middleName);
        }

        if (lastName !== undefined) {
            updateFields.push('lastName = ?');
            values.push(lastName);
        }

        if (gender !== undefined) {
            updateFields.push('gender = ?');
            values.push(gender);
        }

        if (birthDate !== undefined) {
            updateFields.push('birthDate = ?');
            values.push(birthDate);
        }

        if (occupation !== undefined) {
            updateFields.push('occupation = ?');
            values.push(occupation);
        }

        if (maritalStatusEnumId !== undefined) {
            updateFields.push('maritalStatusEnumId = ?');
            values.push(maritalStatusEnumId);
        }

        if (employmentStatusEnumId !== undefined) {
            updateFields.push('employmentStatusEnumId = ?');
            values.push(employmentStatusEnumId);
        }

        // Join the update fields into a comma-separated string
        const updateFieldsString = updateFields.join(', ');


        const updateQuery = `
        UPDATE Person
        SET
          ${updateFieldsString}
        WHERE partyId = ?
      `;

        // Add the partyId to the values array
        values.push(partyId);

        db.query(updateQuery, values, (error, results) => {
            if (error) {
                console.error('Error updating person: ' + error.message);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Person not found' });
            }

            console.log('Person updated successfully');
            res.status(200).json({ success: true, message: 'Person updated successfully' });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


exports.getPerson = async (req, res) => {
    const partyId = req.params.partyId;

    try {
        let selectQuery;
        let queryParams;

        if (partyId) {
            // Retrieve person data for a specific partyId
            selectQuery = `
          SELECT * FROM Person
          WHERE partyId = ?
        `;
            queryParams = [partyId];
        } else {
            // Retrieve all person data
            selectQuery = 'SELECT * FROM Person';
            queryParams = [];
        }

        db.query(selectQuery, queryParams, (error, results) => {
            if (error) {
                console.error('Error getting person data: ' + error.message);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ success: false, message: 'No matching person data found' });
            }

            const personData = results;

            console.log('Person data retrieved successfully');
            res.status(200).json({ success: true, data: personData });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};



exports.insertOrder = async (req, res) => {
    try {
        const { orderName, currencyUomId, salesChannelEnumId, statusId, productStoreId, placedDate, approvedDate } = req.body;

        // Set default values for currencyUomId and statusId
        const defaultCurrencyUomId = currencyUomId || 'USD';
        const defaultStatusId = statusId || 'OrderPlaced';

        const insertQuery = `
            INSERT INTO \`Order\` (
                orderName,
                currencyUomId,
                salesChannelEnumId,
                statusId,
                productStoreId,
                placedDate,
                approvedDate
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        // Only include parameters in the values array if they are not null
        const values = [
            orderName,
            currencyUomId !== null ? currencyUomId : defaultCurrencyUomId,
            salesChannelEnumId,
            statusId !== null ? statusId : defaultStatusId,
            productStoreId,
            placedDate,
            approvedDate
        ];

        db.query(insertQuery, values, (error, results) => {
            if (error) {
                console.error('Error creating order:', error.message);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
            const orderId = results.insertId; // Get the auto-generated orderId
            console.log('Order created successfully');
            res.status(200).json({ success: true, data: "Order inserted successfully", order_Id: orderId });
        });
    } catch (error) {
        console.error('Error inserting order:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


