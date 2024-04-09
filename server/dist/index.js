"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const db_1 = require("./db");
const Login_1 = require("./routes/Login");
const SignUp_1 = require("./routes/SignUp");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:5173", // Allow requests from the client's origin
        methods: ["GET", "POST"], // Allow only GET and POST requests
    },
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = 3000;
io.on('connection', (socket) => {
    console.log('A client connected');
    socket.on('code-change', (newCode) => {
        socket.broadcast.emit('code-change', newCode);
    });
    socket.on('disconnect', () => {
        console.log('A Client disconnected');
    });
});
(0, db_1.connectDB)();
app.post('/api/Login', Login_1.Login);
app.post('/api/SignUp', SignUp_1.SignUp);
httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
