import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { Conflict, HttpError } from '../middleware/index.js';
import { Settings, User } from '../models/index.js';
import { comparePassword, hashPassword } from '../utils/index.js';
import { sendUser } from '../utils/senduser/index.js';
import sendEmailTemplate from '../views/email/sendEmailTemplate';

class AuthService {
  async signUp(payload) {
    const { name, email, password } = payload;
    const [firstname = '', lastname = ''] = name.split(' ');

    try {
      const userExists = await User.findOne({
        where: { email },
        withDeleted: true,
      });

      if (userExists) {
        if (userExists.is_deleted) {
          throw new HttpError(
            403,
            'Account associated with this email has been deleted. Please contact support for assistance.'
          );
        }
        throw new Conflict('User already exists');
      }

      const hashedPassword = await hashPassword(password);
      const user = new User();
      user.first_name = firstname;
      user.last_name = lastname;
      user.email = email;
      user.password = hashedPassword;
      user.is_verified = true;

      const createdUser = await user.save();

      await sendEmailTemplate({
        to: email,
        subject: 'Welcome to AIForHomework',
        templateName: 'account-creation',
        variables: {
          name: user.last_name,
        },
      });

      const userResponse = sendUser(user);

      return {
        user: userResponse,
        message: 'User Created Successfully.',
      };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(error.status || 500, error.message || error);
    }
  }

  async verifyEmail(token, otp) {
    try {
      const decoded = jwt.verify(token, config.TOKEN_SECRET);
      const userId = decoded.userId;

      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        throw new HttpError(404, 'User not found');
      }

      if (user.otp !== otp || user.otp_expires_at < new Date()) {
        throw new HttpError(400, 'Invalid OTP');
      }

      user.is_verified = true;
      await user.save(user);

      return { message: 'Email successfully verified' };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new HttpError(400, 'Verification token has expired');
      }
      throw new HttpError(error.status || 500, error.message || error);
    }
  }

  async login(payload) {
    const { email, password } = payload;

    try {
      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw new HttpError(401, 'Invalid credentials');
      }

      if (user.google_id && user.password === null) {
        throw new HttpError(401, 'User Created with Google');
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new HttpError(401, 'Invalid credentials');
      }

      const access_token = jwt.sign({ user_id: user.id }, config.TOKEN_SECRET, {
        expiresIn: '1d',
      });

      const userResponse = sendUser(user);

      return {
        user: userResponse,
        access_token,
        message: 'Login successful',
      };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError(error.status || 500, error.message || error);
    }
  }

  async forgotPassword(email) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new HttpError(404, 'User not found');
      }

      const resetToken = jwt.sign({ userId: user.id }, config.TOKEN_SECRET, {
        expiresIn: '1d',
      });

      const resetUrl = `${config.BASE_URL}/reset-password?token=${resetToken}`;

      await sendEmailTemplate({
        to: email,
        subject: 'Reset Password',
        templateName: 'password-reset',
        variables: {
          name: user.last_name,
          resetUrl,
        },
      });

      return { message: 'Password reset link sent successfully.' };
    } catch (error) {
      throw new HttpError(error.status || 500, error.message || error);
    }
  }

  async resetPassword(token, new_password, confirm_password) {
    try {
      const payload = jwt.verify(token, config.TOKEN_SECRET);
      const user = await User.findOne({
        where: { id: payload.userId },
      });

      if (!user) {
        throw new HttpError(404, 'Token is invalid or has expired');
      }

      if (new_password !== confirm_password) {
        throw new HttpError(400, 'Passwords do not match');
      }

      const hashed_password = await hashPassword(new_password);

      user.password = hashed_password;
      await user.save(user);

      return { message: 'Password reset successfully.' };
    } catch (error) {
      throw new HttpError(error.status || 500, error.message || error);
    }
  }
}

export { AuthService };
