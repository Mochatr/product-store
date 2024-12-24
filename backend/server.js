import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config(); // to access the .env file

const app = express();
const port = 5000;

app.get("/", (req, res) => {
    res.send("Welcome to the MERN Stack");
});

app.listen(port, () => {
    connectDB();
    console.log("The server is running on port 5000");
});
