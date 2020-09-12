'use strict';
const Income = require('../../model')['Income'];
const ObjectId = require('mongodb').ObjectID;


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


// exports.addIncomeSingle = async (req, res) => {    
//     try{
//     const body = req.body;
//     const data = {
//             date: body['date'],
//             income: body['income'],
//             description: body['description']
//     };
//     const incomePayload = new Income(data);
//     const savedIncomePayload = await incomePayload.save();

//         res.status(201).send({
//             status: "success",
//             message: "Successfully added income entries",
//             data: savedIncomePayload
//         });
//         }catch(Exception){
//         res.status(422).send({
//             type: "ValidationError",
//             message: Exception});
//             console.error(Exception);
//     }
// }

exports.addIncome = async (req, res) => {    
    try{
    const body = req.body;

    const savedIncomePayload = await Income.insertMany(body);

        res.status(201).send({
            status: "success",
            message: "Successfully added income entries",
            addedData: savedIncomePayload
        });
        }catch(Exception){
            res.status(422).send({
            type: "ValidationError",
            message: Exception});
            console.error(Exception);
        }
    }

    exports.updateIncome = async (req, res) => {    
        try{
            const id = req.params.id
            const body = req.body;
        const data = {
            date: body['date'],
            income: body['income'],
            description: body['description']
    };
       const savedIncomePayload = await Income.findOneAndUpdate({_id: new ObjectId(id)}, data, {new: true});
            res.status(200).send({
                status: "success",
                message: "Successfully updated income entry.",
                updatedData: savedIncomePayload
            });
            }catch(Exception){
                res.status(422).send({type: "ValidationError",message: Exception});
                console.error(Exception);
            }
        }


        exports.deleteIncome = async (req, res) => {    
            try{
                const id = req.params.id
                const body = req.body;
            const data = {
                date: body['date'],
                income: body['income'],
                description: body['description']
        };
           const deletedIncomePayload = await Income.findOneAndDelete({_id: new ObjectId(id)});
                res.status(200).send({
                    status: "success",
                    message: "Successfully deleted entry.",
                    deletedData: deletedIncomePayload
                });
                }catch(Exception){
                    res.status(422).send({type: "ValidationError",message: Exception});
                    console.error(Exception);
                }
            }