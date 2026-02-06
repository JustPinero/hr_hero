import express from 'express';
import cors from 'cors';
import path from 'path';
import { env } from './config/env';
import routes from './routes/index';
import { errorHandler, NotFoundError } from './middleware/errorHandler';

const app = express();

app.use(cors({ origin: env.CLIENT_URL }));
app.use(express.json());

if (env.NODE_ENV === 'development') {
  app.use((req, _res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

app.use(routes);

if (env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}

app.use((_req, _res, next) => {
  next(new NotFoundError('The requested resource does not exist within Megacorp Tower.'));
});

app.use(errorHandler);

export default app;
