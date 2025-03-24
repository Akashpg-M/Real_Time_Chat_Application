import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./route/message.route.js";
import cookieParser from "cookie-parser";

import { connectDB }from "./lib/db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.listen(5001, () => {
  console.log(`Server is running on Port ${PORT}`);
  connectDB();
});