import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json()); // accept JSON data in the request body
app.use("/api/products", productRoutes);

app.listen(port, () => {
    connectDB();
    console.log("The server is running on port 5000");
});
