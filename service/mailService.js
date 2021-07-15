require("dotenv").config();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: process.env.USER_EMAIL, pass: process.env.USER_PASSWORD },
});

module.exports.sendConfirmationEmail = async (name, email) => {
  const confirmationCode = await jwt.sign(
    { email },
    process.env.SECRET_ACCESS_KEY_DEV
  );
  transport
    .sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Please activate your account",
      html: `<h1>Email Confirmation</h1>
    <h2>Hello ${name}</h2>
    <p>Thank you for signing up!! To activate your account, please confirm your email by clicking on the following link</p>
    <a href=https://biller-indonesia.herokuapp.com/api/biller/confirm/${confirmationCode}> Click here</a>
    or
    <a href=http://localhost:8080/api/biller/confirm/${confirmationCode}> Click here for local test only</a>`,
    })
    .catch((err) => console.log(err));
};

module.exports.sendNotificationEmail = async (name, email) => {
  const confirmationCode = await jwt.sign(
    { email },
    process.env.SECRET_ACCESS_KEY_DEV
  );
  transport
    .sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Password Change Notification",
      html: `<h1>Notification Email</h1>
    <h2>Hello ${name}</h2>
    <p>This is a confirmation that your Ubuntu One password has been changed successfully.</p>
    <p>If you requested the password change, there is no further action needed, and your new Ubuntu One password is active immediately.</p>
    <p>If you have any questions or did not request an Ubuntu One password change, please contact us at:</p>
    <a href=https://biller-indonesia.herokuapp.com/api/biller/help> Click here</a>
    or
    <a href=http://localhost:8080/api/biller/confirm/${confirmationCode}> Click here for local test only</a>`,
    })
    .catch((err) => console.log(err));
};
