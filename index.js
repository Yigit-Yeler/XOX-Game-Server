import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js'
const app = express();
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
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`)
        })

    })
    .catch((e) => {
        console.log(e)
    })