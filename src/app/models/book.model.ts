import { Schema, model } from 'mongoose';
import { IBookDocument } from '../interfaces/book.interface';

const bookSchema = new Schema<IBookDocument>(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        genre: {
            type: String,
            required: true,
            enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        },
        isbn: { type: String, required: true, unique: true },
        description: { type: String },
        copies: { type: Number, required: true, min: 0 },
        available: { type: Boolean, default: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

bookSchema.method("updateAvailability", async function () {
    this.available = this.copies > 0;
    return await this.save();
});


export const Book = model<IBookDocument>('Book', bookSchema);