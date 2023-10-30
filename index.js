const mongoose=require("mongoose");
const Cors=require("cors");

const express=require("express");

const app=express();
const { connection} =require("./db");

// app.listen(process.env.PORT,async()=>{
//     try {
//         await connection
//         console.log("server is running ");
//     } catch (error) {
//         console.log(error)
//     }
// })
module.exports=app