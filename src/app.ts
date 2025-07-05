import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bookRoutes from './app/routes/book.route';
import borrowRoutes from './app/routes/borrow.route';
import dotenv from "dotenv";

dotenv.config();
const app: Application = express();


app.use(
    cors({
        origin: ['http://localhost:5173', 'https://library-management-liart-delta.vercel.app']
    })
);
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library Management App');
});

export default app;