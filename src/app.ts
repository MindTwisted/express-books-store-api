require('module-alias/register');

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import apiRouter from '@routes/api';

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.set('port', port);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', apiRouter);

app.listen(port);

export default app;