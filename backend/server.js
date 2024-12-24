import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";

dotenv.config(); // to access the .env file

const app = express();
const port = 5000;

app.use(express.json()); // to parse JSON bodies, it allows us to accept JSON data in the request body

app.put("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product Id" });
    }

    try {
        const updateProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updateProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
  });

app.get("/api/products",async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in Fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
})

app.post("/api/products", async (req, res) => { // Create a product
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

app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully"});
    } catch (error){
        console.error("Error in Delete product:", error);
        res.status(404).json({ success: false, message: "Product not found" });
    }
});

app.listen(port, () => {
    connectDB();
    console.log("The server is running on port 5000");
});
