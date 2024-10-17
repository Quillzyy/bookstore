import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Create a new book
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const books = await Book.findById(id);
        return res.status(200).json(books);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Update a book by id
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

export default router;
