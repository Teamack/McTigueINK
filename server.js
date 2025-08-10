import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer();
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
