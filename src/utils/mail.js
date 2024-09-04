import nodemailer from 'nodemailer';
import { config } from '../configs/index.js';
import { log } from '../utils/index.js';
import { ServerError } from '../middlewares/index.js';

export const sendMail = async (emailcontent) => {
  const transporter = nodemailer.createTransport({
    service: config.SMTP_SERVICE,
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail(emailcontent);
    return 'Email sent successfully.';
  } catch (error) {
    log.error(error);
    throw new ServerError(error);
  }
};
