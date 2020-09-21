'use strict'
import firebase from 'firebase';
import { Request, Response, NextFunction, response } from 'express';

export const firebaseAPIKey = {
    apiKey: 'AIzaSyDuDcqcH0eKNWE1Y90Q-5CwjLKH_IsAJlo',
    authDomain: 'financial-budgeting-a8d47.firebaseapp.com',
    databaseURL: 'https://financial-budgeting-a8d47.firebaseio.com',
    projectId: 'financial-budgeting-a8d47',
    storageBucket: 'financial-budgeting-a8d47.appspot.com',
    messagingSenderId: '589339173436',
    appId: '1:589339173436:web:0082961d35d810070a1939',
    measurementId: 'G-WQNRLG19VF',
};

firebase.initializeApp(firebaseAPIKey);

export async function loginEmail (email:string, password: string) {
    try{

    
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        
        ;
    }catch (err) {
        response.status(400).send({
          status: "Error",
          message: err.message,
        });
      }
    
}