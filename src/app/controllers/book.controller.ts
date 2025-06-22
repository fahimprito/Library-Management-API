import { Request, Response } from 'express';
import { Book } from '../models/book.model';
import mongoose from 'mongoose';

const createBook = async (req: Request, res: Response) => {
    try {
        const bookData = req.body;
        const result = await Book.create(bookData);

        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
};

const getAllBooks = async (req: Request, res: Response) => {
    try {

        const {
            filter,
            sortBy = 'createdAt',
            sort,
            limit,
        } = req.query;

        const query: any = {};
        if (filter) {
            query.genre = filter;
        }


        const sortOptions: Record<string, 1 | -1> = {};
        if (sortBy === 'createdAt') {
            sortOptions[sortBy as string] = sort === 'desc' ? -1 : 1;
        } else {
            sortOptions[sortBy as string] = sort === 'asc' ? 1 : -1;
        }

        const books = await Book.find(query).sort(sortOptions).limit(parseInt(limit as string || "10"));
        res.status(200).json({
            success: true,
            message: 'Books fetched successfully',
            data: books,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
};


const getBookById = async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findById(bookId);

        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: book,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
};


const updateBook = async (req: Request, res: Response): Promise<any> => {
    try {
        const { bookId } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
            new: true,
            runValidators: true,
        });

        return res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
};

const deleteBook = async (req: Request, res: Response): Promise<any> => {
    try {
        const { bookId } = req.params;
        const deletedBook = await Book.findByIdAndDelete(bookId);

        return res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: null,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
};

export const bookController = { createBook, getAllBooks, getBookById, updateBook, deleteBook };
