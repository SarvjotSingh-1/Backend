
// require('dotenv').config({path:'./env'})

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ 
    path: './env'
 });


 connectDB()
 .then(()=>{
    app.listen(process.env.PORT || 800, () => {
        console.log(`Server is running on port: ${process.env.PORT}`);
        
    });
 })
 .catch((err) => {
    console.log('Mongo db connection error !!', err);
    
 });

/*import express from "express";
(async ()  =>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

       app.on("error",(err) => {console.log(err)
        throw err;});

        app.listen(process.env.PORT,() => {
            console.log('Server is running on port: ', process.env.PORT);
            
        })
       
    }
    catch (e) {
        console.log('Error: ', e);
        throw e;
        
    }
})() */