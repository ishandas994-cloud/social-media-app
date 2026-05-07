// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
})







connectDB()









// import express from "express"









/*
const app=express()

(async()=>{
    try{
       await mongoose.connect(`${process.env.MONGODB-URL}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.log("their is an error!!",error);
       })
    app.listen(process.env.PORT,()=>{
             console.log(`app is listening on port ${process.env.PORT}`)
        })
    }catch(error){
        console.log("there is an error",error)
        throw err
    }
})()
*/