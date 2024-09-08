import { config } from '../configs/index.js';

export const verifyEmailOtp = (user, otp, otpExpiryHours) => ({
  from: config.nodemailerEmail,
  to: user.email,
  subject: 'Your 6-digit Verification Code',
  html: `
    <p>Hello ${user.name},</p>
    <p>Use the 6-digit Code provided below to verify your email:</p>
    <p>Your verification code is: <b>${otp}</b></p>
    <p>This code will expire in ${otpExpiryHours} hours.</p>
    <p>If you didn't register, please ignore this email.</p>
    <p>Best regards,<br>Ink Touch CEO,</p>`,
});

export const welcomeEmail = (user) => ({
  from: config.nodemailerEmail,
  to: user.email,
  subject: 'Welcome to Ink Touch Printing',
  html: `<p>Hello ${user.name},</p>
      <p>Welcome to Ink Touch Printing!</p>
      <p>Your account has been successfully created, granting you access to our platform's exciting features.</p>
      <p>Should you have any inquiries or require assistance, please don't hesitate to contact our support team at <a href="tel:${config.companyNumber}">${config.companyNumber}</a> or <a href="mailto:${config.companyEmail}">${config.companyEmail}</a>.Your satisfaction is our priority, and we are committed to providing you with the assistance you need.</p>
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

export const requestProductMail = (user, requestProduct) => ({
  from: config.nodemailerEmail,
  to: user.email,
  subject: 'Product Request Confirmation',
  html: `
     <p>Hello ${user.name},</p>
     <p>Your product request with reference number ${requestProduct.ref} has been submitted.</p>
     <p><strong>Request Details:</strong></p>
     <ul>
       <li>Category: ${requestProduct.category}</li>
       <li>Size: ${requestProduct.size}</li>
       <li>Material: ${requestProduct.material}</li>
       <li>Quantity Requested: ${requestProduct.quantity_requested}</li>
       <li>Narration: ${requestProduct.narration}</li>
     </ul>
       
    <p>Best regards,<br>Ink Touch CEO,</p>`,
});

export const wasteProductMail = (user, newWastage) => ({
  from: config.nodemailerEmail,
  to: user.email,
  subject: 'Wastage Submission Confirmation',
  html: `
     <p>Hello ${user.name},</p>
     <p>Your waste submission with reference number ${newWastage.ref} has been submitted.</p>
     <p><strong>Waste Details:</strong></p>
     <ul>
       <li>Category: ${newWastage.category}</li>
       <li>Size: ${newWastage.size}</li>
       <li>Material: ${newWastage.material}</li>
       <li>Quantity Requested: ${newWastage.waste_quantity}</li>
       <li>Narration: ${newWastage.narration}</li>
     </ul>
       
    <p>Best regards,<br>Ink Touch CEO,</p>`,
});

export const updateProfile = (user) => ({
  from: config.nodemailerEmail,
  to: updatedUser.email,
  subject: 'Your Information Has Been Modified!',
  html: `
      
    <p>Dear  ${updatedUser.name},</p>
    <p>This message is to inform you that there has been an update to your information in our database.</p>

    <p>Your new information:</p>
    <ul>
        <li>Full Name: ${updatedUser.name}</li>
        <li>Email Address: ${updatedUser.email}</li>
        <li>Phone Number: ${updatedUser.phone_number}</li>
        <li>Password: ${updatedUser.password}</li>
        <li>Home Address: ${updatedUser.address}</li>
        <li>City: ${updatedUser.city}</li>
         <li>State: ${updatedUser.state}</li>
    </ul>
      
    <p>Please review the changes to ensure that they accurately reflect your information. If you believe any information is incorrect or if you have any questions regarding the update, please don't hesitate to reach out to our administrative team at <a href="tel:${config.companyNumber}">${config.companyNumber}</a> or <a href="mailto:${config.companyEmail}">${config.companyEmail}</a>. Your satisfaction is important to us, and we are here to assist you.</p>

    <p>It's important to us your records are kept up-to-date for your convenience and our records.</p>
      
    <p>Best regards,<br>Ink Touch CEO,</p>`,
});
