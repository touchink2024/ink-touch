import { Forbidden } from './error.js';
import { User } from '../models/index.js';

export const checkRole = (roles) => (req, res, next) => {
  const user = req.user;

  const hasRole = user?.role.some((r) => roles.includes(r));

  if (!hasRole) {
    return next(
      new Forbidden('You do not have permission to access this resource')
    );
  }
  next();
};
