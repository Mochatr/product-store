import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config(); // to access the .env file

const app = express();
const port = 5000;

app.get("/", (req, res) => { 
    res.send("Welcome to the MERN Stack");
});

app.post("/products", async (req, res) => { // Create a product
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct});
    } catch (error){
        console.error("Error in Create product:", error);
        res.status(500).json({ success: false, message: "Server Error"});
    }
  });

app.listen(port, () => {
    connectDB();
    console.log("The server is running on port 5000");
});
