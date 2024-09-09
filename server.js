import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { router } from './routes/index.js';
import {
  config,
  startServer,
  corsOptions,
  keepAlive,
} from './configs/index.js';

import {
  appMiddleware,
  errorHandler,
  routeNotFound,
} from './middlewares/index.js';

const app = express();

app.use(cors(corsOptions));

// Set no-cache headers middleware
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.header('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  next();
});

app.use(morgan('tiny'));
app.disable('x-powered-by');

app.use(router);
app.use(appMiddleware);

//Use the ErrorHandler middleware as the last middleware
app.use(errorHandler, routeNotFound);

// Create an HTTP server instance
const server = http.createServer(app);

// Start the server
startServer(server);

keepAlive();
