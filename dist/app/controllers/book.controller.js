"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = void 0;
const book_model_1 = require("../models/book.model");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookData = req.body;
        const result = yield book_model_1.Book.create(bookData);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
});
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort, limit, } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const sortOptions = {};
        if (sortBy === 'createdAt') {
            sortOptions[sortBy] = sort === 'desc' ? -1 : 1;
        }
        else {
            sortOptions[sortBy] = sort === 'asc' ? 1 : -1;
        }
        const books = yield book_model_1.Book.find(query).sort(sortOptions).limit(parseInt(limit || "10"));
        res.status(200).json({
            success: true,
            message: 'Books fetched successfully',
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
});
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const updatedBook = yield book_model_1.Book.findByIdAndUpdate(bookId, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        yield book_model_1.Book.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
});
exports.bookController = { createBook, getAllBooks, getBookById, updateBook, deleteBook };
