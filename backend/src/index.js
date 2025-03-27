import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";

import { connectDB }from "./lib/db.js";
import dotenv from "dotenv";

import cors from 'cors';
dotenv.config();
const app = express();

app.use(express.json({limit: "10mb"}));
app.use(cookieParser({limit: "10mb", extended: true}));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

const PORT = process.env.PORT;
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.listen(5001, () => {
  console.log(`Server is running on Port ${PORT}`);
  connectDB();
});