const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

const { connection} =require("./db");
const { router } = require("./routes/routes");
const app=express();

app.use(cors());
app.use(express.json());
app.use("/api",router)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("server is running ");
    } catch (error) {
        console.log(error)
    }
})
