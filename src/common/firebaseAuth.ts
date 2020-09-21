'use strict'
import firebase from 'firebase';
import { response } from 'express';
import { resolve } from 'path';

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
  let signInData;
    await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((value) => {signInData=value})
        .catch((Error) => {throw Error})
        ;
        return signInData;
    }
    
export async function createUserWithEmailAndPassword (email:string, password: string) {
    let signInData;
    await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((value)=> ()=> {signInData=value})
        .catch((Error) => {throw Error})
        ;
      console.log(signInData);
        return signInData;
        
    }