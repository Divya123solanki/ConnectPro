import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  logger: true,
  debug: true,
  secureConnection: false, 
  auth: {
    user: "moreyogita120@gmail.com", 
    pass: "iqsx eglj vkjr ejij", 
  },
  tls: {
    rejectUnauthorized: true,
  },
});

export const sendEmail = (username, userName) => {
  const emailOptions = {
    from: "clone@gmail.com", 
    to: username,
    subject: "Connect Pro",
    text: "Welcome",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome Email</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .email-container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
        }
        .header {
          background-color: blue;
          color: white;
          padding: 10px 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          padding: 20px;
          text-align: center;
        }
        .button {
          display: inline-block;
          background-color: blue;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
        }
        .footer {
          padding: 10px;
          text-align: center;
          background-color: #f4f4f4;
          font-size: 12px;
          color: #777;
          border-radius: 0 0 8px 8px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Welcome to Our Service!</h1>
        </div>
        <div class="content">
          <p>Hi ${userName},</p> <!-- Dynamically insert the user's name -->
          <p>Thank you for signing up with us. We're excited to have you on board! You can start exploring and enjoying our services right away.</p>
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <a href="https://www.yourwebsite.com" class="button">Get Started</a>
        </div>
        <div class="footer">
          <p>&copy; 2024 ConnectPro Corporation, 1‌000 West Maude Avenue, Sunnyvale, CA 94085. ConnectPro and the ConnectPro logo are registered trademarks of ConnectPro.</p>
        </div>
      </div>
    </body>
    </html>
    `,
  };

  transport.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log("Error sending email:", err);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
};

app.get("/", (req, res) => {
  res.json({ msg: "Email has been sent." });
});

