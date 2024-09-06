import { Forbidden } from './error.js';
import { User } from '../models/index.js';

export const checkRole = (roles) => (req, res, next) => {
  const user = req.user;

  if (!user || !roles.includes(user.role)) {
    return next(
      new Forbidden('You do not have permission to access this resource')
    );
  }
  next();
};
