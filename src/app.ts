import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import { MainRouter } from './routes/main.routes';
import helmet from "helmet";
import ErrorHandling from './middlewares/error-handlling';
import cookieParser  from 'cookie-parser';
import connectDB from './utils/db-connect';
import cors from 'cors';

const app: Application = express();

connectDB();
app.use(cors())
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', MainRouter);
app.use(ErrorHandling)


export default app;
