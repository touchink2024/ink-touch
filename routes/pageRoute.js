import { Router } from 'express';

import * as pageController from '../controllers/index.js';

const pageRoute = Router();

pageRoute.get('/', pageController.indexPage);

export { pageRoute };
