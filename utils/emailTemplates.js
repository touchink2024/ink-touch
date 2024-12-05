import { config } from '../configs/index.js';

export const awaitingVerifyEmail = (newUser) => ({
  from: config.nodemailerEmail,
  to: newUser.email,
  subject: 'Welcome to Ink Touch Printing',
  html: `<p>Hello ${newUser.name},</p>
      <p>Welcome to Ink Touch Printing!</p>
      <p>Your account has been successfully created, kindly contact admin to approve your registration.</p>
      <p>Should you have any inquiries or require assistance, please don't hesitate to contact our support team at <a href="tel:${config.companyNumber}">${config.companyNumber}</a> or <a href="mailto:${config.companyEmail}">${config.companyEmail}</a>.Your satisfaction is our priority, and we are committed to providing you with the assistance you need.</p>
      <p>Best regards,<br>Ink Touch CEO,</p>`,
});

export const welcomeEmail = (newUser) => ({
  from: config.nodemailerEmail,
  to: newUser.email,
  subject: 'Welcome to Ink Touch Printing',
  html: `<p>Hello ${newUser.name},</p>
      <p>Welcome to Ink Touch Printing!</p>
      <p>Your account has been successfully created, granting you access to our platform's exciting features.</p>
      <p>Should you have any inquiries or require assistance, please don't hesitate to contact our support team at <a href="tel:${config.companyNumber}">${config.companyNumber}</a> or <a href="mailto:${config.companyEmail}">${config.companyEmail}</a>.Your satisfaction is our priority, and we are committed to providing you with the assistance you need.</p>
      <p>Best regards,<br>Ink Touch CEO,</p>`,
});

export const approveEmail = (user) => ({
  from: config.nodemailerEmail,
  to: user.email,
  subject: 'Welcome to Ink Touch Printing',
  html: `<p>Hello ${user.name},</p>
      <p>Welcome to Ink Touch Printing!</p>
      <p>Your account has been successfully activated, granting you access to our platform's exciting features.</p>
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

       <p>Best regards,<br> Ink Touch CEO,</p>`,
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

  <p>Best regards,<br> Ink Touch CEO,</p>`,
});

export const loginEmail = (user) => ({
  from: config.nodemailerEmail,
  to: user.email,
  subject: 'New Login Detected!',
  html: `
     <p>Hello ${user.name},\n\nWe noticed a new login to your account. If this was not you, please contact support immediately.</p>
   
     <p>We value your continued association with us, and it's important to us that your records are kept up-to-date for your convenience and our records.</p>
       
    <p>Best regards,<br> Ink Touch CEO,</p>`,
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
       <li>Quantity Requested: ${requestProduct.quantity_requested}</li>
       <li>Narration: ${requestProduct.narration}</li>
     </ul>
       
    <p>Best regards,<br>Ink Touch CEO,</p>`,
});

export const returnProductMail = (user, newReturn) => ({
  from: config.nodemailerEmail,
  to: user.email,
  subject: 'Return Submission Confirmation',
  html: `
     <p>Hello ${user.name},</p>
     <p>Your return submission with reference number ${newReturn.ref} has been submitted.</p>
     <p><strong>Return Details:</strong></p>
     <ul>
       <li>Category: ${newReturn.category}</li>
       <li>Size: ${newReturn.size}</li>
       <li>Quantity Requested: ${newReturn.return_quantity}</li>
       <li>Narration: ${newReturn.narration}</li>
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
       <li>Quantity Requested: ${newWastage.waste_quantity}</li>
       <li>Narration: ${newWastage.narration}</li>
     </ul>
       
    <p>Best regards,<br>Ink Touch CEO,</p>`,
});

export const updateProfile = (user, updatedUser) => ({
  from: config.nodemailerEmail,
  to: user.email,
  subject: 'Your Information Has Been Modified!',
  html: `
      
    <p>Dear  ${user.name},</p>
    <p>This message is to inform you that there has been an update to your information in our database.</p>

    <p>Your new information:</p>
    <ul>
        <li>Full Name: ${updatedUser.name}</li>
        <li>Email Address: ${updatedUser.email}</li>
        <li>Phone Number: ${updatedUser.phone_number}</li>
    </ul>
      
    <p>Please review the changes to ensure that they accurately reflect your information. If you believe any information is incorrect or if you have any questions regarding the update, please don't hesitate to reach out to our administrative team at <a href="tel:${config.companyNumber}">${config.companyNumber}</a> or <a href="mailto:${config.companyEmail}">${config.companyEmail}</a>. Your satisfaction is important to us, and we are here to assist you.</p>

    <p>It's important to us your records are kept up-to-date for your convenience and our records.</p>
      
    <p>Best regards,<br>Ink Touch CEO,</p>`,
});

export const requestUpdateMail = (user, request, request_status) => ({
  from: config.nodemailerEmail,
  to: user.email,
  subject: `Request ${request_status}`,
  html: `
      
    <p>Dear ${user.name}</p>
    <p>Your request (Ref Number: ${
      request.ref
    }) has been ${request_status.toLowerCase()}.\n\nThank you..</p>
      
    <p>If you believe any information is incorrect or if you have any questions regarding the update, please don't hesitate to reach out to our administrative team at <a href="tel:${
      config.companyNumber
    }">${config.companyNumber}</a> or <a href="mailto:${config.companyEmail}">${
    config.companyEmail
  }</a>. Your satisfaction is important to us.</p>

    <p>Best regards,<br>Ink Touch CEO,</p>`,
});

export const returnUpdateMail = (user, returned, return_status) => ({
  from: config.nodemailerEmail,
  to: user.email,
  subject: `Wastage ${return_status}`,
  html: `
      
    <p>Dear ${user.name}</p>
    <p>Your waste (Ref Number: ${
      returned.ref
    }) has been ${return_status.toLowerCase()}.\n\nThank you..</p>
      
    <p>If you believe any information is incorrect or if you have any questions regarding the update, please don't hesitate to reach out to our administrative team at <a href="tel:${
      config.companyNumber
    }">${config.companyNumber}</a> or <a href="mailto:${config.companyEmail}">${
    config.companyEmail
  }</a>. Your satisfaction is important to us.</p>

    <p>Best regards,<br>Ink Touch CEO,</p>`,
});

export const wasteUpdateMail = (user, waste, waste_status) => ({
  from: config.nodemailerEmail,
  to: user.email,
  subject: `Wastage ${waste_status}`,
  html: `
      
    <p>Dear ${user.name}</p>
    <p>Your waste (Ref Number: ${
      waste.ref
    }) has been ${waste_status.toLowerCase()}.\n\nThank you..</p>
      
    <p>If you believe any information is incorrect or if you have any questions regarding the update, please don't hesitate to reach out to our administrative team at <a href="tel:${
      config.companyNumber
    }">${config.companyNumber}</a> or <a href="mailto:${config.companyEmail}">${
    config.companyEmail
  }</a>. Your satisfaction is important to us.</p>

    <p>Best regards,<br>Ink Touch CEO,</p>`,
});

export async function requestReminderMail(adminEmail, user, request) {
  return {
    from: config.nodemailerEmail,
    to: adminEmail,
    subject: 'Product Request Reminder',
    html: `
     <p> Dear Admin,</p>

     <p>This is a gentle reminder that the product request you accepted an hour ago is now due. The details are as follows:</p>
     <ul>
     <li> Category: ${request.category}</li>
     <li> Size: ${request.size}</li>
     <li>  Quantity Requested: ${request.quantity_requested}</li>
     <li> Operator: ${user.name}</li>
      </ul>
      <p>  Please check on the operator to ensure the requested product has been provided.</p>

      Thank you for your attention.<br>
      Best regards,<br>
      Ink Touch CEO
    `,
  };
}
