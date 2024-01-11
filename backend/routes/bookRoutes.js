import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Create a new book
router.post("/", async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: "All Fields are required. (title, author, publishYear)"
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error.");
    }
});

// Get all books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).send(books);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error.");
    }
});

// Get a single book
router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send("Book not found.");
        }
        return res.status(200).send(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error.");
    }
});

// Update a book
router.put("/:id", async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: "All Fields are required. (title, author, publishYear)"
            });
        }
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
            }
        );
        if (!book) {
            return res.status(404).send("Book not found.");
        }
        return res.status(200).send(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error.");
    }
});

// Delete a book
router.delete("/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).send("Book not found.");
        }
        return res.status(200).send(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error.");
    }
});

export default router;