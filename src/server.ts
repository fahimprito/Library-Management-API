import { Server } from 'http';
import app from './app';

let server: Server;

const PORT = 5000;

function main() {
    server = app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`);
    });
}

main();