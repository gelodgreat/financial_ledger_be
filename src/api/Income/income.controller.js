'use strict';
const Income = require('../../model')['Income'];

exports.getAllIncome = async (req, res) => {
    Income.find((err, income) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: income
        });
    });
}