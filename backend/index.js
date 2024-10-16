import express from "express";
import { PORT, DB_URI } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
    console.log(req);
    return res.status(200).send("Hello World");
});

app.post("/books", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send("Please fill all required fields");
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
});

app.get("/books", async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
});

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
