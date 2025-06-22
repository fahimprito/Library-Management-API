import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bookRoutes from './app/routes/book.route';

const app: Application = express();


app.use(cors());
app.use(express.json());

app.use('/api/books', bookRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library Management App');
});

export default app;