import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
.then(() => console.log("Connection successfull"))
.catch(err => console.error("MongoDB Connection Error:", err));