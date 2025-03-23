import express from "express";
import authRoutes from "./routes/auth.route.js";

import { connectDB }from "./lib/db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT;
app.use("/api/auth", authRoutes);

app.listen(5001, () => {
  console.log(`Server is running on Port ${PORT}`);
  connectDB();
});