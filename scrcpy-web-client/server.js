import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { startScrcpy, stopScrcpy } from '@yume-chan/adb-scrcpy';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Client connected');
  const scrcpyProcess = startScrcpy();
  scrcpyProcess.stdout.on('data', (data) => {
    socket.emit('videoFrame', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    stopScrcpy(scrcpyProcess);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
