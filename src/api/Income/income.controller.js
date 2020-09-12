'use strict';
const Income = require('../../model')['Income'];

exports.getAllIncome = async (req, res) => {
    Income.find((err, income) => {
        if (err) {
            res.status(400).json({
                status: "error",
                message: err,
            });
        }
        res.status(200).json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: income
        });
    });
}