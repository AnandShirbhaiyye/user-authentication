import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { getApiHealth } from "./controllers/health.js";

const app = express();
app.use(express.json());

dotenv.config();

async function connectMongoDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
      console.log("Connected to MongoDB📦");
    }
  } catch (err) {
    console.log(err.message);
  }
}
connectMongoDB();

app.get("/api/health", getApiHealth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`The server is Running on Port ${PORT} 🚀`);
});
