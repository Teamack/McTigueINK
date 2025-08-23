import http from 'http';
import { Server } from 'socket.io';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load canonical entities from YAML at startup
const canonPath = path.join(__dirname, 'canon', 'sst.yaml');
const canon = YAML.parse(readFileSync(canonPath, 'utf8'));

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname.startsWith('/api/canon')) {
        const id = url.pathname.split('/').pop();
        const entity = canon[id];
        res.setHeader('Content-Type', 'application/json');
        if (entity) {
            res.writeHead(200);
            res.end(JSON.stringify(entity));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Not found' }));
        }
        return;
    }

    // Let socket.io handle its own requests
    if (url.pathname.startsWith('/socket.io')) {
        return;
    }

    res.statusCode = 404;
    res.end();
});

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('update', (data) => {
        socket.broadcast.emit('update', data);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => console.log('Server running on port 3000'));
