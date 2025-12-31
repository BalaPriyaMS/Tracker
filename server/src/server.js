import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import { handlerRouter } from './routes/index.js';
import { logger } from './common/logger.js';  

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser())



app.use((req, res, next) => {
  const start = Date.now();

  logger.info(`${req.method} ${req.originalUrl} called`);


  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });

  next();
});

app.use('/api/v1', handlerRouter());


app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
