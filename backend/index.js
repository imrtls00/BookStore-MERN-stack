import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();

// Middleware for accepting JSON and urlencoded data
app.use(express.json());

// Middleware for CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

app.get("/", (req, res) => {
    console.log(req);
    return res.status(200).send("Hello World!");
});

// Routes
app.use("/books", bookRoutes);

// Connect to MongoDB and start the server
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("MongoDB connection established successfully.")
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost/${PORT}.`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed.");
        console.log(err);
    });

