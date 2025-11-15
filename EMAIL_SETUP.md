# 📧 Email Setup Guide

This guide will help you configure email sending for the contact form.

## 🚀 Quick Setup (Gmail - Recommended)

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled

### Step 2: Generate App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** and **Other (Custom name)**
3. Enter "Portfolio Contact Form" as the name
4. Click **Generate**
5. Copy the 16-character password (no spaces)

### Step 3: Configure Environment Variables

Add to `server/.env`:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
CONTACT_EMAIL=your-email@gmail.com
```

**Important:** Use the App Password, NOT your regular Gmail password!

## 🔧 Alternative: Custom SMTP

If you're using a different email provider (Outlook, Yahoo, custom SMTP):

### For Outlook/Hotmail:
```env
EMAIL_SERVICE=smtp
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
CONTACT_EMAIL=your-email@outlook.com
```

### For Yahoo:
```env
EMAIL_SERVICE=smtp
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-app-password
CONTACT_EMAIL=your-email@yahoo.com
```

### For Custom SMTP:
```env
EMAIL_SERVICE=smtp
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASS=your-password
CONTACT_EMAIL=your-email@yourdomain.com
```

## ✅ Testing

1. Start your backend server:
   ```bash
   cd server
   npm run dev
   ```

2. Fill out the contact form on your website
3. Check your email inbox for the message

## 🐛 Troubleshooting

### "Email authentication failed"
- Make sure you're using an App Password (for Gmail), not your regular password
- Verify 2-Factor Authentication is enabled (for Gmail)
- Check that `EMAIL_USER` and `EMAIL_PASS` are correct

### "Could not connect to email server"
- Check your `SMTP_HOST` and `SMTP_PORT` settings
- Verify your firewall isn't blocking the connection
- Try port 465 with `SMTP_SECURE=true` if 587 doesn't work

### "Email service not configured"
- Make sure all email environment variables are set in `server/.env`
- Restart your backend server after adding environment variables

## 🔒 Security Notes

- ✅ Never commit `.env` files to Git
- ✅ Use App Passwords instead of regular passwords when possible
- ✅ Keep your email credentials secure
- ✅ In production (Vercel), set environment variables in the dashboard

## 📝 Production Setup (Vercel)

When deploying to Vercel:

1. Go to your backend project in Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add all email-related variables:
   - `EMAIL_SERVICE`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `SMTP_HOST` (if using custom SMTP)
   - `SMTP_PORT` (if using custom SMTP)
   - `SMTP_SECURE` (if using custom SMTP)
   - `CONTACT_EMAIL`

4. Redeploy your backend

## 🎯 Email Service Providers

### Recommended for Production:
- **SendGrid** - Free tier: 100 emails/day
- **Mailgun** - Free tier: 5,000 emails/month
- **Resend** - Free tier: 3,000 emails/month
- **AWS SES** - Pay-as-you-go

For production, consider using a dedicated email service instead of Gmail SMTP for better deliverability and higher limits.

