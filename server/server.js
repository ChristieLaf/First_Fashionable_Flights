import express, { json } from 'express';
import path from 'path';
import apiRouter from './routers/apiRouter.js';
import weatherRouter from './routers/weatherRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(express,json());

app.use(
  '/api',
  (req, res, next) => {
    console.log('Reached API endpoint');
    return next();
  },
  apiRouter
);

app.use('/weather', weatherRouter);

app.use(express.static(path.join(path.dirname(''), '..', 'client', 'dist')));

app.use('*', (req, res) => {
  res.sendFile(path.resolve(path.dirname(''), '..', 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});