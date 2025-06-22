import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Book } from '../models/book.model';
import { Borrow } from '../models/borrow.model';

const borrowBook = async (req: Request, res: Response): Promise<any> => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;

        if (!mongoose.isValidObjectId(bookId)) {
            return res.status(400).json({ success: false, message: 'Invalid book ID' });
        }

        const book = await Book.findById(bookId);
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
        await book.updateAvailability();

        // create borrow
        const borrowRecord = await Borrow.create({
            book: book._id,
            quantity,
            dueDate,
        });

        return res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrowRecord,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
};

export const borrowController = {
    borrowBook
};
