import mongoose from "mongoose";
const { connect } = mongoose;
import { config } from "dotenv";

config({
    path: "./.env",
});

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION!!! shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});


import app from "./app.js";

const database = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
  

//Database Connect
connect(database,{
   // userCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((con)=>{
    console.log("Database Connection Successfully");
});

//Start The Server
const port = process.env.PORT || 5004;
app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});

//Close The Server
process.on("unhandleRejection", (err)=>{
    console.log("UNHANDLED REJECTION!!!  Shutting Down ...");
    console.log(err.name, err.message);
})



  
