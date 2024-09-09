import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { config, startServer } from './src/configs/index.js';
import { router } from './src/routes/index.js';
import {
  appMiddleware,
  errorHandler,
  routeNotFound,
} from './src/middlewares/index.js';

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

app.use(router);
app.use(appMiddleware);

//Use the ErrorHandler middleware as the last middleware
app.use(errorHandler, routeNotFound);

// Create an HTTP server instance
const server = http.createServer(app);

// Start the server
startServer(server);
