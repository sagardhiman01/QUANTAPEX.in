const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware (Layer: Security)
app.use(helmet());

// Logging Middleware (Layer: Monitoring & Logging)
app.use(morgan('dev'));

// Rate Limiting (Layer: Security)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Standard Middleware
app.use(cors());
app.use(express.json());

// Path for our "Database" (Layer: Database)
const LEADS_FILE = path.join(__dirname, 'leads.json');

// Initialize "Database" if it doesn't exist
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([]));
}

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// API endpoint to handle contact form submissions
app.post('/api/contact', async (req, res) => {
  const { name, email, company, website, message } = req.body;

  // Basic Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  // Save to "Database" (Persistent Storage)
  try {
    const leads = JSON.parse(fs.readFileSync(LEADS_FILE));
    leads.push({
      id: Date.now(),
      name,
      email,
      company,
      website,
      message,
      timestamp: new Date().toISOString()
    });
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
    console.log('Lead saved to database.');
  } catch (dbError) {
    console.error('Database Error:', dbError);
  }

  // Email Notification
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to yourself
    subject: `New Lead from ${name} (Quantapex)`,
    text: `You have received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nWebsite: ${website || 'N/A'}\nMessage:\n${message}`,
    replyTo: email
  };

  try {
    // Note: This will only work if EMAIL_USER and EMAIL_PASS are set in .env
    if (process.env.EMAIL_USER && process.env.EMAIL_USER !== 'your_email@gmail.com') {
      await transporter.sendMail(mailOptions);
    }
    res.status(200).json({ success: 'Message received and saved!' });
  } catch (error) {
    console.error('Email Notification Error:', error);
    // Even if email fails, we return success because it was saved to the database
    res.status(200).json({ success: 'Message saved, but notification failed.' });
  }
});

// Admin Route to fetch leads (Layer: Backend / APIs)
app.get('/api/leads', (req, res) => {
  try {
    const leads = JSON.parse(fs.readFileSync(LEADS_FILE));
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Full-Stack Server running on port ${PORT}`);
});
