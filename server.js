import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { config, startServer } from './configs/index.js';
import { router } from './routes/index.js';

import {
  appMiddleware,
  addRequestCountToLocals,
  addReturnCountToLocals,
  addWasteCountToLocals,
  errorHandler,
  routeNotFound,
} from './middlewares/index.js';

const app = express();

// Set no-cache headers middleware
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.header('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  next();
});

const trustedOrigins = [config.baseUrl];
app.use(
  cors({
    origin: trustedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  })
);

app.use(morgan('tiny'));
app.disable('x-powered-by');
app.use(addRequestCountToLocals, addReturnCountToLocals, addWasteCountToLocals);

app.use(router);
app.use(appMiddleware);

app.use(errorHandler, routeNotFound);

// Create an HTTP server instance
const server = http.createServer(app);

// Start the server
startServer(server);
