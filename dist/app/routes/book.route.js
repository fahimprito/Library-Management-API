"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const bookRoutes = express_1.default.Router();
bookRoutes.post('/', book_controller_1.bookController.createBook);
bookRoutes.get('/', book_controller_1.bookController.getAllBooks);
bookRoutes.get('/:bookId', book_controller_1.bookController.getBookById);
bookRoutes.put('/:bookId', book_controller_1.bookController.updateBook);
bookRoutes.delete('/:bookId', book_controller_1.bookController.deleteBook);
exports.default = bookRoutes;
