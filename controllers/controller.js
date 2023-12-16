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



exports.insertOrderItem = async (req, res) => {
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


exports.addOrderItems = async (req, res) => {

    // async function addOrderItems(req, res) {
    try {
        const {
            orderId,
            partName,
            facilityId,
            shipmentMethodEnumId = 'ShMthGround',
            customerPartyId,
            item_details,
        } = req.body;

        // Validate mandatory fields
        if (!orderId || !customerPartyId || !item_details || item_details.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid request. Missing mandatory fields.' });
        }

        // Insert Order details
        const insertOrderQuery = `
            INSERT INTO order_part (
                ORDER_ID,
                PART_NAME,
                FACILITY_ID,
                SHIPMENT_METHOD_ENUM_ID,
                CUSTOMER_PARTY_ID
            ) VALUES (?, ?, ?, ?, ?)
        `;

        const orderValues = [orderId, partName, facilityId, shipmentMethodEnumId, customerPartyId];
        const orderInsertResult = await db.query(insertOrderQuery, orderValues);

        const orderPartSeqId = orderInsertResult.insertId;

        // Insert Order Items
        const insertOrderItemQuery = `
            INSERT INTO orderitem (
                orderId,
                orderPartSeqId,
                productId,
                itemDescription,
                quantity,
                unitAmount
            ) VALUES (?, ?, ?, ?, ?, ?)
        `;

        for (const item of item_details) {
            const { productId, itemDescription, quantity, unitAmount } = item;
            const orderItemValues = [orderId, orderPartSeqId, productId, itemDescription, quantity, unitAmount];
            await db.query(insertOrderItemQuery, orderItemValues);
        }

        return res.status(200).json({
            success: true,
            message: 'Order items added successfully.',
            orderId,
            orderPartSeqId,
        });
    } catch (error) {
        console.error('Error adding order items:', error.message);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// module.exports = {
//     addOrderItems,
// };

exports.addOrderItems = async (req, res) => {

    try {
        const selectOrdersQuery = `
            SELECT
                o.ORDER_ID,
                o.ORDER_NAME,
                o.CURRENCY_UOM AS currencyUom,
                o.SALES_CHANNEL_ENUM_ID AS salesChannelEnumId,
                o.STATUS_ID AS statusId,
                o.PLACED_DATE,
                o.GRAND_TOTAL,
                c.CUSTOMER_PARTY_ID,
                c.FIRST_NAME,
                c.MIDDLE_NAME,
                c.LAST_NAME
            FROM
                order_header o
            JOIN
                party c ON o.CUSTOMER_PARTY_ID = c.PARTY_ID
        `;

        const ordersResult = await db.query(selectOrdersQuery);

        const orders = ordersResult.map(order => {
            return {
                orderId: order.ORDER_ID,
                orderName: order.ORDER_NAME,
                currencyUom: order.currencyUom,
                salesChannelEnumId: order.salesChannelEnumId,
                statusId: order.statusId,
                placedDate: order.PLACED_DATE,
                grandTotal: order.GRAND_TOTAL,
                customer_details: {
                    customerPartyId: order.CUSTOMER_PARTY_ID,
                    firstName: order.FIRST_NAME,
                    middleName: order.MIDDLE_NAME,
                    lastName: order.LAST_NAME
                }
            };
        });

        // Fetch order parts and items
        for (const order of orders) {
            const selectOrderPartsQuery = `
                SELECT
                    op.ORDER_PART_SEQ_ID,
                    op.PART_NAME,
                    op.FACILITY_ID,
                    op.SHIPMENT_METHOD_ENUM_ID,
                    op.STATUS_ID AS partStatusId,
                    op.PART_TOTAL
                FROM
                    order_part op
                WHERE
                    op.ORDER_ID = ?
            `;

            const orderPartsResult = await db.query(selectOrderPartsQuery, [order.orderId]);

            order.order_parts = orderPartsResult.map(orderPart => {
                return {
                    orderPartSeqId: orderPart.ORDER_PART_SEQ_ID,
                    partName: orderPart.PART_NAME,
                    facilityId: orderPart.FACILITY_ID,
                    shipmentMethodEnumId: orderPart.SHIPMENT_METHOD_ENUM_ID,
                    partStatusId: orderPart.partStatusId,
                    partTotal: orderPart.PART_TOTAL
                };
            });

            // Fetch order items for each order part
            for (const orderPart of order.order_parts) {
                const selectOrderItemsQuery = `
                    SELECT
                        oi.ORDER_ITEM_SEQ_ID,
                        oi.PRODUCT_ID,
                        oi.ITEM_DESCRIPTION,
                        oi.QUANTITY,
                        oi.UNIT_AMOUNT
                    FROM
                        orderitem oi
                    WHERE
                        oi.ORDER_ID = ? AND oi.ORDER_PART_SEQ_ID = ?
                `;

                const orderItemsResult = await db.query(selectOrderItemsQuery, [order.orderId, orderPart.orderPartSeqId]);

                orderPart.item_details = orderItemsResult.map(orderItem => {
                    return {
                        orderItemSeqId: orderItem.ORDER_ITEM_SEQ_ID,
                        productId: orderItem.PRODUCT_ID,
                        itemDescription: orderItem.ITEM_DESCRIPTION,
                        quantity: orderItem.QUANTITY,
                        unitAmount: orderItem.UNIT_AMOUNT
                    };
                });
            }
        }

        return res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Error getting all orders:', error.message);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

