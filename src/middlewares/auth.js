import jwt from 'jsonwebtoken';
import { config } from '../configs/index.js';
import { log } from '../utils/index.js';
import { User } from '../models/index.js';
import { ServerError } from './index.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status_code: '401',
        message: 'Invalid token',
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status_code: '401',
        message: 'Invalid token',
      });
    }

    jwt.verify(token, config.TOKEN_SECRET, async (err, decoded) => {
      if (err || !decoded) {
        return res.status(401).json({
          status_code: '401',
          message: 'Invalid token',
        });
      }

      const { user_id } = decoded;

      const user = await User.findOne({
        where: { id: user_id },
      });
      if (!user) {
        return res.status(401).json({
          status_code: '401',
          message: 'Invalid token',
        });
      }

      req.user = {
        email: user.email,
        user_id: user.id,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
      };

      next();
    });
  } catch (error) {
    log.error(error);
    throw new ServerError('INTERNAL_SERVER_ERROR');
  }
};
