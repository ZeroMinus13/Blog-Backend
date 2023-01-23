import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import * as mongoose from 'mongoose';
import cors from 'cors';
import { routes } from './routes/routes';
dotenv.config();

const start = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.mongodb || 'mongodb://localhost:1000/mydb');
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }
};
start();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => 'Server started!');
