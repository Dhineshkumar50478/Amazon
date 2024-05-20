const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3500;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve the static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// In-memory store for OTPs
const otps = {};

// Route to send email
app.post('/send-email', (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

  // Store OTP
  otps[email] = otp;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dineshselvaraj50478@gmail.com',
      pass: 'pqzxjlcornlxvjvi', // Consider using environment variables for security
    },
  });

  const mailOptions = {
    from: 'dineshselvaraj50478@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.toString() });
    }
    res.status(200).json({ message: 'Email sent:Successfully '});
  });
});

// Route to verify OTP
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otps[email] && otps[email] == otp) {
    delete otps[email]; // OTP is used, so remove it
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

// Catch-all handler to serve index.html for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
