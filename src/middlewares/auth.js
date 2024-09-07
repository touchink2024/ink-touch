import jwt from 'jsonwebtoken';
import { config } from '../configs/index.js';
import { log } from '../utils/index.js';
import { User } from '../models/index.js';

// verifyUserToken middleware
const verifyUserToken = async (req, res, next) => {
  try {
    // Retrieve access token from the session
    const accessToken = req.session.accessToken;

    if (!accessToken) {
      console.log('No access token found');
      req.session.authErrorMessage = 'Please sign in to access this page';
      return res.redirect('/auth/login');
    }

    // Verify the access token
    jwt.verify(accessToken, config.jwtSecret, (err, decodedAccessToken) => {
      if (err) {
        console.log('Invalid access token');
        req.session.authErrorMessage = 'Please sign in to access this page';
        return res.redirect('/auth/login');
      } else {
        // Access token is valid
        req.user = decodedAccessToken;
        next(); // Continue to the next middleware or route handler
      }
    });
  } catch (error) {
    log.error(error);
    req.session.authErrorMessage = 'An error occurred. Please try again.';
    return res.redirect('/auth/login');
  }
};

// Middleware to verify token and redirect based on role
const verifyToken = (role) => (req, res, next) => {
  const accessToken = req.session.accessToken;

  if (accessToken) {
    jwt.verify(accessToken, config.jwtSecret, (err, decodedToken) => {
      if (err) {
        next(); // Invalid token, proceed to the next middleware or route
      } else {
        // Token is valid, redirect based on role
        if (decodedToken.role === role) {
          next(); // User has the correct role, proceed to the next middleware or route
        } else {
          return res.status(403).json({ message: 'Access denied' });
        }
      }
    });
  } else {
    next(); // No token, proceed to the next middleware or route
  }
};

// Middleware for checking if specific user roles are logged in
const isUserSignedIn = verifyToken('User');
const isAdminSignedIn = verifyToken('Admin');

const getAdminById = async (req, res, next) => {
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
    log.error(error);
    next(error);
  }
};

const getUserById = async (req, res, next) => {
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
    log.error(error);
    next(error);
  }
};
export {
  verifyUserToken,
  isUserSignedIn,
  isAdminSignedIn,
  getAdminById,
  getUserById,
};
