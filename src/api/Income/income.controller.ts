'use strict';
import { Request, Response } from 'express'
import { Income } from '../../model'
import { ObjectID } from 'mongodb'

export default class IncomeController {

    public async getAllIncome (req: Request, res: Response) {
        try {
            const userId = req.params.id
            const query = req.query

            const income = userId
            ? await Income.find({ userId: new ObjectID(userId), ...query })
            : await Income.find(query)

            res.status(200).send({
            status: 'success',
            message: 'Income retrieved successfully',
            data: income
            })
        } catch (error) {
            res.status(400).send({
            status: 'Error',
            message: error
            })
        }
        }

        public async addIncome (req: Request, res: Response) {
            try {
                const body= req.body
                const savedIncomePayload = await Income.insertMany(body);
                
                res.status(201).send({
                status: 'success',
                message: 'Successfully added income.',
                data: savedIncomePayload
                })
            } catch (error) {
                res.status(400).send({
                status: 'Error',
                message: error
                })
            }
            }

            public async updateIncome (req: Request, res: Response) {
                try{
                    const id = req.params.id
                    const body = req.body;
                const data = {
                    date: body['date'],
                    income: body['income'],
                    description: body['description']
            };
               const savedIncomePayload = await Income.findOneAndUpdate({_id: new ObjectID(id)}, data, {new: true});
                    res.status(200).send({
                        status: "success",
                        message: "Successfully updated income.",
                        updatedData: savedIncomePayload
                    });
                    }catch(Exception){
                        res.status(422).send({type: "ValidationError",message: Exception});
                        console.error(Exception);
                    }
                }
        
        
                public async deleteIncome (req: Request, res: Response) {
                    try{
                        const id = req.params.id
                        const body = req.body;
                    const data = {
                        date: body['date'],
                        income: body['income'],
                        description: body['description']
                };
                   const deletedIncomePayload = await Income.findOneAndDelete({_id: new ObjectID(id)});
                        res.status(200).send({
                            status: "success",
                            message: "Successfully deleted income.",
                            deletedData: deletedIncomePayload
                        });
                        }catch(Exception){
                            res.status(422).send({type: "ValidationError",message: Exception});
                            console.error(Exception);
                        }
                    }



}