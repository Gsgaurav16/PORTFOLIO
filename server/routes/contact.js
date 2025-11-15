import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

// Create reusable transporter
const createTransporter = () => {
  // If using Gmail with App Password
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password, not regular password
      },
    })
  }

  // Generic SMTP configuration
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// Send contact form email
router.post('/send', async (req, res) => {
  try {
    const { name, email, message } = req.body

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    // Check if email is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration missing')
      return res.status(500).json({ 
        error: 'Email service not configured. Please configure email settings in environment variables.' 
      })
    }

    // Get recipient email from contact section or use default
    const recipientEmail = process.env.CONTACT_EMAIL || process.env.EMAIL_USER

    // Create transporter
    const transporter = createTransporter()

    // Email content
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: recipientEmail,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #FF8A00; padding-bottom: 10px;">
            New Contact Form Message
          </h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Message

Name: ${name}
Email: ${email}

Message:
${message}
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    res.json({ 
      success: true, 
      message: 'Message sent successfully!' 
    })
  } catch (error) {
    console.error('Error sending email:', error)
    
    // Provide helpful error messages
    if (error.code === 'EAUTH') {
      return res.status(500).json({ 
        error: 'Email authentication failed. Please check your email credentials.' 
      })
    }
    
    if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      return res.status(500).json({ 
        error: 'Could not connect to email server. Please check your SMTP settings.' 
      })
    }

    res.status(500).json({ 
      error: 'Failed to send message. Please try again later.' 
    })
  }
})

export default router

