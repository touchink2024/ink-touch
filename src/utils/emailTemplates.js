import { config } from '../configs/index.js';

export const welcomeEmail = (user) => ({
  from: config.nodemailerEmail,
  to: user.email,
  subject: 'Welcome to Ink Touch Printing',
  html: `<p>Hello ${user.name},</p>
      <p>Welcome to Ink Touch Printing!</p>
      <p>We're glad to have you with us. Kindly wait for an admin to verify your account before you can sign in. You will receive an email notification once your account is verified.</p>
      <p>Best regards,<br>Ink Touch CEO,</p>`,
});

export const forgetPasswordEmail = (user, resetLink) => ({
  from: config.nodemailerEmail,
  to: user.email,
  subject: 'Recover your password with Ink Touch Printing!',
  html: `
    <p>Dear ${user.name},</p>

      <p>We are writing to confirm your password recovery with Ink touch printing.</p>
      <p>Reset your password here: <a href="${resetLink}">Click here to reset your password</a></p>

      <p>If you didn't request this verification, please ignore this email.</p>

      <p>If you encounter any issues or need further assistance, feel free to contact our support team at <a href="tel:${config.companyNumber}">${config.companyNumber}</a> or <a href="mailto:${config.companyEmail}">${config.companyEmail}</a>. Your satisfaction is important to us, and we are here to assist you</p>

       <p>Best regards,<br>Ink Touch CEO,</p>`,
});

export const resetPasswordEmail = (user) => ({
  from: config.nodemailerEmail,
  to: user.email,
  subject: 'Password Reset Successful!',
  html: `
  <p>Dear ${user.name},</p>

  <p>We are writing to confirm your password recovery with Ink Touch Printing.</p>
  <p>Your password has been successfully reset. You can now log in to your account using your new password.</p>

  <p>If you did not request this password reset, please contact us immediately. at <a href="tel:${config.companyNumber}">${config.companyNumber}</a> or <a href="mailto:${config.companyEmail}">${config.companyEmail}</a>. Your satisfaction is important to us, and we are here to assist you</p>

  <p>Best regards,<br>Ink Touch CEO,</p>`,
});

export const loginEmail = (user) => ({
  from: config.nodemailerEmail,
  to: user.email,
  subject: 'New Login Detected!',
  html: `
     <p>Hello ${user.name},\n\nWe noticed a new login to your account. If this was not you, please contact support immediately.</p>
   
     <p>We value your continued association with us, and it's important to us that your records are kept up-to-date for your convenience and our records.</p>
       
    <p>Best regards,<br>Ink Touch CEO,</p>`,
});

export const accountStatusMail = (user) => ({
  from: config.nodemailerEmail,
  to: user.email,
  subject: 'Account Status Update!',
  html: `      
    <p>Hello ${user.name},</p>
    <p>Your account status has been updated to: <strong>${user.accountStatus}</strong>. </p>
    <p>Thank you for working with us at Ink Touch Printing! Granting you access to our platform's exciting features</p>
      
    <p>Should you have any inquiries or require assistance, please don't hesitate to contact our support team at <a href="tel:${config.companyNumber}">${config.companyNumber}</a> or <a href="mailto:${config.companyEmail}">${config.companyEmail}</a>.Your satisfaction is our priority, and we are committed to providing you with the assistance you need.</p>
      
    <p>Best regards,<br>Ink Touch CEO,</p>`,
});
