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

    // // Retrieve the token from cookies
    // const token = req.cookies.token;

    // if (!token) {
    //   return res.status(401).json({
    //     status_code: '401',
    //     message: 'Invalid token',
    //   });
    // }

    jwt.verify(token, config.accessToken, async (err, decoded) => {
      if (err || !decoded) {
        return res.status(401).json({
          status_code: '401',
          message: 'Invalid token',
        });
      }

      const { user_id } = decoded;

      const user = await User.findOne({ id: user_id });
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
      };

      next();
    });
  } catch (error) {
    log.error(error);
    throw new ServerError('INTERNAL_SERVER_ERROR');
  }
};

// const verifyUserToken = async (req, res, next) => {
//   try {
//     const userAccessToken = req.cookies.userAccessToken;
//     const userRefreshToken = req.cookies.userRefreshToken;

//     if (!userAccessToken || !userRefreshToken) {
//       req.session.authErrorMessage = 'Please sign in to access this page';
//       return res.redirect('/auth/login');
//     }

//     const checkIfBlacklisted = await Blacklist.findOne({
//       token: { $in: [userAccessToken, userRefreshToken] },
//     });
//     if (checkIfBlacklisted) {
//       req.session.authErrorMessage = 'This session has expired. Please login';
//       return res.redirect('/auth/login');
//     }

//     // Verify access token
//     jwt.verify(
//       userAccessToken,
//       config.jwtSecret,
//       (err, decodedUserAccessToken) => {
//         if (err) {
//           // If access token verification fails, check refresh token
//           jwt.verify(
//             userRefreshToken,
//             config.jwtSecret,
//             async (err, decodedUserRefreshToken) => {
//               if (err) {
//                 // Both tokens are invalid, return unauthorized
//                 req.session.authErrorMessage =
//                   'Please sign in to access this page';
//                 return res.redirect('/auth/login');
//               } else {
//                 // Refresh token is valid, generate a new access token
//                 const newUserAccessToken = jwt.sign(
//                   { id: decodedUserRefreshToken.id, role: 'User' },
//                   config.jwtSecret,
//                   { expiresIn: config.userAccessTokenExpireTime }
//                 );
//                 // Set new access token in cookies
//                 res.cookie('userAccessToken', newUserAccessToken, {
//                   httpOnly: true,
//                   secure: true,
//                 });
//                 req.user = decodedUserRefreshToken;
//                 next();
//               }
//             }
//           );
//         } else {
//           // Access token is valid
//           req.user = decodedUserAccessToken;
//           next();
//         }
//       }
//     );
//   } catch (error) {
//     log.error(error);
//     req.session.authErrorMessage = 'An error occurred. Please try again.';
//     return res.redirect('/auth/login');
//   }
// };
