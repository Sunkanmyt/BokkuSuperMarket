const nodemailer = require("nodemailer");

// Create a transporter using your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., Gmail, Outlook, etc.
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = transporter;
