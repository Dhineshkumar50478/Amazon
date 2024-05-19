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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Route to send email
app.post('/send-email', (req, res) => {
  const { email } = req.body;
  let otp = Math.floor(Math.random() * 100000);

    var transporter = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "api",
        pass: "802998eefb9cf4e13f812ab5f141e283"
      }
    });


  const mailOptions = {
    from: 'dineshselvaraj50478@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `OTP: ${otp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.toString() });
    }
    res.status(200).json({ message: 'Email sent: ' + info.response });
  });
});

// Catch-all handler to serve index.html for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
