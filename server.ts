import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url!, true);
      handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error handling request:', err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('A user connected with socket ID:', socket.id);

    socket.on('disconnect', () => {
      console.log('User disconnected with socket ID:', socket.id);
    });

    // Example event for human-in-the-loop notifications
    socket.on('human_approval_request', (data) => {
      console.log('Received human approval request:', data);
      // Broadcast to a specific channel for reviewers
      io.to('reviewers').emit('new_approval_request', data);
    });

    // A channel for human reviewers to join
    socket.on('join_reviewers_channel', () => {
        socket.join('reviewers');
        console.log(`Socket ${socket.id} joined the reviewers channel.`);
    });
  });

  httpServer
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    })
    .on('error', (err) => {
      console.error('Server error:', err);
      process.exit(1);
    });
});