import { Forbidden } from './error.js';

export const checkRole = (roles) => (req, res, next) => {
  const user = req.currentUser;

  if (!user || !roles.includes(user.role)) {
    return next(
      new Forbidden('Only super admin have permission to access this resource')
    );
  }
  next();
};
