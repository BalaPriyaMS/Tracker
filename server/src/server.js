import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { handlerRouter } from './routes/index.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));

app.use(express.json());
app.use("/api/v1",handlerRouter());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});