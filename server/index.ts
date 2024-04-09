import express from 'express'; 
import cors from 'cors';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { connectDB } from './db';
import { Login } from './routes/Login';
import { SignUp } from './routes/SignUp';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from the client's origin
    methods: ["GET", "POST"], // Allow only GET and POST requests
  },
});

app.use(cors());

    
app.use(express.json());

const port = 3000;

io.on('connection', (socket: Socket) => {
    console.log('A client connected');
    socket.on('code-change', (newCode: string) => {
        socket.broadcast.emit('code-change', newCode);
    });
    socket.on('disconnect', () => {
        console.log('A Client disconnected');
    });
});

connectDB();

app.post('/api/Login', Login);
app.post('/api/SignUp', SignUp);

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
