import jwt from 'jsonwebtoken';
import { config } from '../configs/index.js';
import { User } from '../models/index.js';

export const verifyUserToken = async (req, res, next) => {
  try {
    const accessToken =
      req.cookies.accessToken || req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      req.session.authErrorMessage = 'Sign in to access this page';
      return res.redirect('/auth/login');
    }

    try {
      const decodedAccessToken = jwt.verify(accessToken, config.accessToken);
      req.user = decodedAccessToken;

      return next();
    } catch (tokenError) {
      res.clearCookie('accessToken');
      req.session.authErrorMessage =
        'Your session has expired. Please sign in again.';
      return res.redirect('/auth/login');
    }
  } catch (error) {
    res.clearCookie('accessToken');
    req.session.authErrorMessage = 'An error occurred. Please try again.';
    return res.redirect('/auth/login');
  }
};
export const getAdminById = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'Admin' && user.role !== 'Super_Admin') {
      return res
        .status(403)
        .json({ message: 'User is not an admin or super admin' });
    }

    if (user.image && user.image.data) {
      user.imageBase64 = user.image.data.toString('base64');
    }

    req.currentUser = user;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'User') {
      return res
        .status(403)
        .json({ message: 'Only user can access this page' });
    }

    if (user.image && user.image.data) {
      user.imageBase64 = user.image.data.toString('base64');
    }

    req.currentUser = user;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
