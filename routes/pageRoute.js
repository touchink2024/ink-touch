import { Router } from 'express';
import { indexPage } from '../controllers/index.js';

const pageRoute = Router();

pageRoute.get('/', indexPage);

export { pageRoute };
