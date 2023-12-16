// controllers/personController.js

const db = require('../config/db');

exports.insertPerson = async (req, res) => {
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
