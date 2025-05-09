import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import { config } from '../configs/index.js';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appMiddleware = express();

appMiddleware.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

appMiddleware.use(express.static(path.join(__dirname, '../public')));
appMiddleware.use(express.urlencoded({ extended: false }));
appMiddleware.use(express.json());
appMiddleware.use(cookieParser());

appMiddleware.set('view engine', 'ejs');
appMiddleware.set('views', path.join(__dirname, '../views'));

export { appMiddleware };
