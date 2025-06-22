import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';

let server: Server;

const PORT = 5000;

async function main() {
    try {
        await mongoose.connect('mongodb+srv://mongodbTestingTS:PqSKFiewR6dlEO9C@cluster0.h6kac.mongodb.net/library-management-app?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connected to MongoDB Using Mongoose!!");
        server = app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main();