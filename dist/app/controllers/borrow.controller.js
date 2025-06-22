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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        if (!mongoose_1.default.isValidObjectId(bookId)) {
            return res.status(400).json({ success: false, message: 'Invalid book ID' });
        }
        const book = yield book_model_1.Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        if (!book.available || quantity > book.copies) {
            return res.status(400).json({
                success: false,
                message: 'Not enough copies available to borrow',
            });
        }
        // Deduct book copies
        book.copies -= quantity;
        yield book.updateAvailability();
        // create borrow
        const borrowRecord = yield borrow_model_1.Borrow.create({
            book: book._id,
            quantity,
            dueDate,
        });
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrowRecord,
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
const getBorrowSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' },
                },
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo',
                },
            },
            {
                $unwind: '$bookInfo',
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn',
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary,
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
exports.borrowController = {
    borrowBook,
    getBorrowSummary
};
