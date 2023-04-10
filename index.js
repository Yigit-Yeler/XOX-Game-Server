import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js'
import http from 'http'
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app)
const socket = new Server(server)
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        author: "bennn",
        message: "happpy new year"
    })
})

app.use("/auth", authRoutes)


const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'xox'
    })
    .then(() => {


        server.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`)
        })

    })
    .catch((e) => {
        console.log(e)
    })
socket.on('connection', (socket) => {
    socket.on('joinGame', () => {
        console.log('Odaya katılındı')
        socket.join('room1')
    });

    socket.on('inRoom', () => {
        console.log('Odaya gönerildi')
        socket.to('room1').emit('haber', socket.id)
    });
});

