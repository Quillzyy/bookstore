import express from "express";
import { PORT, DB_URI } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());

app.use(cors()); // Allow all requests
// app.use( // Allow requests from a specific origin
//     cors({
//         origin: "http://localhost:5555",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"],
//     })
// );

app.get("/", (req, res) => {
    console.log(req);
    return res.status(200).send("Hello World");
});

app.use("/books", booksRoute);

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});

mongoose
    .connect(DB_URI)
    .then(() => {
        console.log("App connected to database");
    })
    .catch((error) => {
        console.log("Database connection error:", error);
    });
