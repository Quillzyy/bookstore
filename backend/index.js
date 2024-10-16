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

// Create a new book
app.post("/books", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res
                .status(400)
                .send({ message: "Please fill all required fields" });
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
        return res.status(500).send({ message: error.message });
    }
});

// Get all books
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Get a single book by id
app.get("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const books = await Book.find({ _id: id });

        return res.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Update a book by id
app.put("/books/:id", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res
                .status(400)
                .send({ message: "Please fill all required fields" });
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        return res.status(200).send({ message: "Book updated successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Delete a book by id
app.delete("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.deleteOne({ _id: id });
        if (result.ok === 0) {
            return res.status(404).send({ message: "Book not found" });
        } else {
            return res
                .status(200)
                .send({ message: "Book deleted successfully" });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
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
